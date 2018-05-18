<?php

namespace Bolt\Extension\cdowdy\mediamanager;

$autoload = __DIR__ . '/../vendor/autoload.php';
if ( is_file( $autoload ) ) {
    require $autoload;
}

use Bolt\Asset\File\JavaScript;
use Bolt\Asset\File\Stylesheet;
use Bolt\Controller\Zone;
use Bolt\Extension\SimpleExtension;
use Bolt\Menu\MenuEntry;
use Bolt\Extension\cdowdy\mediamanager\Controller;


class MediaManagerExtension extends SimpleExtension
{


    /**
     * @return array
     */
    protected function registerMenuEntries() {
        $menu = new MenuEntry( 'mediamanager-menu', 'media-manager/files' );
        $menu->setLabel( 'Bolt Media Manager' )
            ->setIcon( 'fa:image' )
            ->setPermission( 'settings' );

        return [
            $menu,
        ];
    }



    /**
     * {@inheritdoc}
     */
    protected function registerTwigPaths() {

        return [ 'templates'=> [ 'position' => 'prepend', 'namespace' => 'mediamanager' ] ];

    }



    /**
     * @return array
     * backend controller for optimization and info  page
     */
    protected function registerBackendControllers() {
        $config = $this->getConfig();

            return [
                '/extensions/media-manager' => new Controller\MediaManagerController($config),
            ];

    }



    protected function registerAssets()
    {
        return [
//            (new JavaScript('fabric.js') )
//                ->setLate( true )
//                ->setPriority( 99 )
//                ->setZone( Zone::BACKEND ),
            (new JavaScript('mediamanager.js') )
                ->setLate( true )
                ->setPriority( 99 )
                ->setZone( Zone::BACKEND ),
            (new Stylesheet('mediamanager.styles.css'))
                ->setPriority(99)
                ->setZone(Zone::BACKEND),
        ];
    }

}