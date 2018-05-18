<?php


namespace Bolt\Extension\cdowdy\mediamanager\Controller;

use Silex\Application;
use Silex\ControllerCollection;
use Silex\ControllerProviderInterface;


use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

use Bolt\Extension\cdowdy\mediamanager\Helpers\FileHelper;



class MediaManagerController implements ControllerProviderInterface
{

    /** @var array The extension's configuration parameters */
    private $config;

    /**
     * Initiate the controller with Bolt Application instance and extension config.
     *
     * @param array $config
     */
    public function __construct( array $config )
    {
        $this->config = $config;
    }

    /**
     * Specify which method handles which route.
     *
     * Base route/path is '/' which gives us the overview list of all the files in "files"
     *
     * The other routes of "/tinypng/optimize" overwrites the original file with an optimized one
     *
     * "/tinypng/optimize/rename" optimizes and saves the file under a new name
     *
     *
     * @param Application $app An Application instance
     *
     * @return ControllerCollection A ControllerCollection instance
     */
    public function connect( Application $app )
    {
        /** @var $ctr \Silex\ControllerCollection */
        $ctr = $app['controllers_factory'];

        // /example/url/in/controller
        $ctr->match( '/files/{directory}', [ $this, 'mmFiles' ] )
            ->assert( "directory", '.+' )
            ->value( "directory", "Files" )
            ->bind( 'mediamanager-files' );

        $ctr->get( '/edit/{directory}', [ $this, 'mmEdit' ] )
            ->assert( "directory", '.+' )
            ->value( "directory", "Files" )
            ->bind( 'mediamanager-edit' );

        $ctr->before( [ $this, 'before' ] );

        return $ctr;
    }

    /**
     * @param Request     $request
     * @param Application $app
     *
     * @return null|RedirectResponse
     */
    public function before( Request $request, Application $app )
    {
        // make sure the logged in user can view and uplooad files
        if ( ! $app['users']->isAllowed( 'files' ) ) {

            /** @var UrlGeneratorInterface $generator */
            $generator = $app['url_generator'];

            return new RedirectResponse( $generator->generate( 'dashboard' ), Response::HTTP_SEE_OTHER );
        }

        // axios sends data differently than Jquery Ajax did
        // Jquery defaults to x-www-form-urlencoded while Axios / fetch send it as actual JSON
        // SO we'll need to decode the request to get the data and use Axios' 'data' key as our key to then
        // grab our 'image' with the associated file name
        // see https://silex.symfony.com/doc/2.0/cookbook/json_request_body.html#parsing-the-request-body
        if ( 0 === strpos( $request->headers->get( 'Content-Type' ), 'application/json' ) ) {
            $requestData = json_decode( $request->getContent( 'data' ), true );

            $request->request->replace( is_array( $requestData ) ? $requestData : [] );
        }

        return null;
    }



    /**
     * @param Application $app
     * @return Filesystem
     */
    private function fsSetup( Application $app )
    {
        // for bolt's new filesystem since $app['resources'] and getPath() are deprecated in 3.3+
        // and will be removed in 4.0

        $boltFilesPath = $app['path_resolver']->resolve('files');

        $adapter       = new Local( $boltFilesPath );
        $filesystem    = new Filesystem( $adapter );

        return $filesystem;
    }



    /**
     * @param $directory
     * @return array
     */
    public function getAllFiles(Application $app,  $directory )
    {
        $filesystem    = $this->fsSetup( $app );

//        $boltFilesPath = $this->boltFilesPath() ;


        if ( $directory == 'Files' ) {
            $fileList = $filesystem->listContents( null, false );
        } else {
            $fileList = $filesystem->listContents( $directory, false );
        }

        // TODO: set a config option to denote the mimetypes we want to use: defaults will be: JPG,PNG,Webp,GIF,Webm,MP4,OGG,AVI
//        $expectedMimes = $this->checkAccpetedTypes();
        $files         = [];

        foreach ( $fileList as $object ) {

            // we only want "files" here so anything else in the files directory can be "discarded"
            // we'll also skip over if there is a ".cache" directory like from my betterthumbs extension
            // finally we'll make sure we are only dealing with jpg/png files
            if ( $object['type'] == 'file'
                && ! preg_match_all( '/^.cache\//i', $object['dirname'] )
                && in_array( strtolower( $filesystem->getMimetype( $object['path'] ) ), $this->checkAccpetedTypes() )
            ) {

                $files[] = [
                    'filename'    => $object['basename'],
                    'directory'     => $object['dirname'],
                    'filePath'   => $object['path'],
                    'fileType' => strtok( $filesystem->getMimetype( $object['path'] ), '/' ),
                    'mimeType'    => $filesystem->getMimetype( $object['path'] ),

//                    'filesize'    => self::bytesToHuman( $filesystem->getSize( $object['path'] ) ),
                ];
            }
        }

        return $files;
    }



    /**
     * @param Application $app
     *
     * @param Request     $request
     *
     * @param             $directory
     *
     * @return mixed
     */
    public function mmFiles( Application $app, Request $request, $directory )
    {

        // context to render in our twig template
        $context = [
//            'mm_files'       => json_encode( $this->getAllFiles($app, $fileList) ),
              'mm_files' => $this->getAllFiles($app, $directory),
//            'mm_directories' => json_encode( $this->getAllDirectories($app, $paths) ),
            'directory'      => $directory,
            'mm_paths' => $this->mmPaths( $app, $request, $directory )
        ];

        return $app['twig']->render( '@mediamanager/mediamanager.base.html.twig', $context );
    }


    /**
     * @param $app
     * @param $fileList
     * @return array
     */
    protected function getAllDirectories( $app, $fileList )
    {
        $filesystem   = $this->fsSetup($app);
        $urlGenerator = $app[ 'url_generator' ];

        $files = [];

        foreach ( $fileList as $object ) {
            if ( $object[ 'type' ] == 'dir'
                && !preg_match_all('/.cache/i', $object[ 'dirname' ])
                && !preg_match_all('/.cache/i', $object[ 'basename' ])
            ) {

                $listPaths = $filesystem->listContents($object[ 'path' ], true);

                $files[] = [
                    'path'         => $object[ 'path' ],
                    'route'        => $urlGenerator->generate('mediamanager-files', [ 'directory' => $object[ 'path' ] ]),
                    'subdirectory' => array_filter($this->listFileSystemPaths($app, $listPaths))
                ];
            }

        }

        return $files;

    }


    /**
     * @param Application $app
     * @param Request     $request
     * @param             $directory
     * @return mixed
     */
    public function mmEdit( Application $app, Request $request, $directory )
    {
        $filesystem     = $this->fsSetup($app);
        $filepath       = $this->mmPaths($app, $request, $directory)[ 'allFiles' ];
        $breadcrumbBase = explode('/', $directory);

        $context = [
            'appPaths' => $this->mmPaths($app, $request, $directory),
            'crumbs'   => $this->simpleBreadCrumbs($filepath, $breadcrumbBase),
            'file'     => $directory,
            'fileType' => strtok($filesystem->getMimetype($directory), '/'),
            'request'  => $request,
        ];

        return $app[ 'twig' ]->render('@mediamanager/mediamanger.edit.twig', $context);
    }


    /**
     * @param $filePath
     * @param $directory
     * @return array
     */
    public function simpleBreadCrumbs( $filePath, $directory )
    {
        $base        = $filePath . '/';
        $breadcrumbs = [];


        foreach ( $directory as $key => $crumb ) {

            $base .= $crumb . '/';
            // names can be duplicated urls are unique
            // also remove the trailing slash
            $breadcrumbs[ rtrim($base, '/') ] = $crumb;
        }
        return $breadcrumbs;
    }


    /**
     * @param Application $app
     * @param Request     $request
     * @param             $directory
     * @return array
     */
    protected function mmPaths(Application $app, Request $request, $directory)
    {
        $urlGenerator = $app[ 'url_generator' ];

        $filesystem = $this->fsSetup( $app );

        $paths = $filesystem->listContents( null );


        return [
            'boltFiles'   => $app[ 'path_resolver' ]->resolve('files'),
            'allFiles'    => $urlGenerator->generate('mediamanager-files'),
            'files'       => $urlGenerator->generate('mediamanager-files', [ 'directory' => $directory ]),
            'edit'        => $urlGenerator->generate('mediamanager-edit', [ 'directory' => $directory ]),
            'directories' => $this->getAllDirectories($app, $paths)
        ];
    }


    /**
     * @param $app
     * @param $paths
     * @return array
     */
    protected function listFileSystemPaths( $app, $paths )
    {
        $pathsList = [];

        $urlGenerator = $app['url_generator'];

        foreach ( $paths as $object ) {
            if ( $object[ 'type' ] == 'dir'
                && !preg_match_all( '/.cache/i', $object[ 'dirname' ] )
                && !preg_match_all( '/.cache/i', $object[ 'basename' ] )
            ) {
                $pathsList[] = [
                    'path'  => $object[ 'path' ],
                    'route' => $urlGenerator->generate('mediamanager-files', [ 'directory' => $object[ 'path' ] ])
                ];
            }
        }
        return $pathsList;
    }


    /**
     * @return array
     */
    protected function checkAccpetedTypes()
    {

        return [
            'image/jpeg', 'image/png', 'image/gif',
            'image/webp', 'video/mp4', 'video/webm',
            'video/ogg', 'video/quicktime', 'video/x-flv',
            'audio/mp4', 'audio/wave', 'audio/ogg',
            'audio/mpeg', 'audio/x-wav', 'audio/flac',
        ];

    }


}