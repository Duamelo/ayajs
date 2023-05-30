When you instantiate aya from the init method, a set of useful attributes is made available to customize the use of the library.
The table below shows the main attributes: their names and descriptions.
## aya.init(width = 1000, height = 1000)

<b>Specification : </b>  The init method is the entry point of aya. It takes two parameters: the width and height of the svg and return an object.


| Attributes's name             | Description
| :-------------:               |:-------------:|
| uuid                          | svg id. |
| svg                           | Represents the svg document in which we draw all the shapes created from the current instantiation.of aya.|
| config                        | Allows you to access the basic configurations of aya.      |


Below we have functions available after calling the init method.

<!-- ## setlinkcb(cb)

Set a callback that represente the instance of link just created. -->

## grid();

    draw the grid inside the svg.

## id();

Return a unique string that can reprensent a unique key to find a component.


## rectangle(x, y, width, height, is_drawing, is_save, uuid);

Return a new rectangular shape.

## lozenge(x, y, width, height, is_drawing, is_save, uuid);

Return a new lozenge shape.

## triangle(x1, y1, x2, y2, x3, y3, is_drawing, is_save, uuid);

Return a new triangular shape.

## circle(x, y, r, is_drawing, is_save, uuid);

Return a new circle shape.

## text(x, y, text, size, dest_x, dest_y, is_drawing, is_save, uuid);

Return a new text.

## line(x, y, dest_x, dest_y, is_drawing, is_save, uuid);

Return a new line shape.


## link(src_id, dest_id, userconfig = {});

Return a new link object that abstractly representes the link materialised by a line.

## Polyline(points=[], is_drawing, is_save, uuid);

Return a new polyline shape.

## Point(x, y, r, is_drawing, is_save, uuid);

Return a new point shape.
It's mainly used to connection's points or  shapes's vertexex.

## arc(x0, y0, x, y, angle, ratio, is_drawing, is_save, uuid);

Return a new arc shape.

## image(x, y, width, height, path, name, is_drawing, is_save, uuid);

Return a new image.