<?php


namespace Bolt\Extension\cdowdy\mediamanager\Helpers\FileHelper;

use Silex\Application;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;


class FileHelper
{

    /**
     * FilePathHelper constructor.
     * @param Application $app
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
    }


    /**
     * Get Bolt's Files path
     * @return mixed
     *
     */
    public function boltFilesPath()
    {
        return $this->app['path_resolver']->resolve('files');

    }

    /**
     * @return Filesystem
     */
    public function fsSetup( )
    {
        // for bolt's new filesystem since $app['resources'] and getPath() are deprecated in 3.3+
        // and will be removed in 4.0

        $boltFilesPath = $this->app['path_resolver']->resolve('files');

        $adapter       = new Local( $boltFilesPath );
        $filesystem    = new Filesystem( $adapter );

        return $filesystem;
    }


    /**
     * @param $directory
     * @return array
     */
    public function getAllFiles( $directory )
    {
        $filesystem    = $this->fsSetup( );

        $boltFilesPath = $this->boltFilesPath() ;


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
                && ! preg_match_all( '/^.cache\//i', $object['dirname'] ) ) {

                $files[] = [
                    'filename'    => $object['basename'],
//                    'located'     => $object['dirname'],
//                    'imagePath'   => $object['path'],
//                    'mimeType'    => $filesystem->getMimetype( $object['path'] ),
//                    'filesize'    => self::bytesToHuman( $filesystem->getSize( $object['path'] ) ),
                ];
            }
        }

        return $files;
    }



    /**
     * @param $bytes
     *
     * @return string
     */
    public static function bytesToHuman( $bytes )
    {
        $units = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PiB' ];

        for ( $i = 0; $bytes > 1024; $i ++ ) {
            $bytes /= 1024;
        }

        return round( $bytes, 2 ) . ' ' . $units[ $i ];
    }


}