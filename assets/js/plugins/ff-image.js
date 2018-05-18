{
    var canvas =  new fabric.Canvas('mmcanvas');


    fabric.Image.fromURL('/files/mm/anders-jilden-108186.jpg', function (img) {
        canvas.add(img);
    });


}