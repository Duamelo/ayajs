When you instantiate aya from the Init class, a set of useful attributes is made available to customize the use of the library.
The table below shows the main attributes: their names and descriptions.
## aya.Init(width = 1343, height = 1343)

<b>Specification : </b>  The init class is the entry point of aya. Its constructor takes two parameters: the width and height of the svg.


| Attributes's name             | Description
| :-------------:               |:-------------:|
| width                         | Width of svg. |
| height                        | Height of svg.     |
| svg                           | Represents the svg document in which we draw all the shapes created from the current instantiation of aya.|
| config                        | Allows you to access the basic configurations of aya.      |
| events                        | Allows to access the events defined by aya and to apply them to the forms.|
| box                           | This is the object component representing the default grid of aya.      |


Now we're going to talk about some function available in the Init class.

## setlinkcb(cb)

Set a callback that represente the instance of link just created.

## Component(type, props)

Return a new component based on the type witch is directly drawn in the svg.

## Rectangle(x, y, width, height)

Return a new rectangular shape on parameters.

## Lozenge(x, y, width, height)

Return a new lozenge shape on parameters.

## Triangle(x1, y1, x2, y2, x3, y3)

Return a new triangular shape based on parameters.

## Circle(x, y, r)

Return a new circle shape based on parameters.

## Text(x, y, text, size)

Return a new text based on parameters.

## Line(x, y, dest_x, dest_y)

Return a new Line shape based on parameters.


## Link(src_point, dest_point, line = undefined)

Return a new Link object that abstractly représente the link materialised by the line's shape.

## Polyline(points=[])

Return a new polyline shape based on the point's array.

## Point(x, y, r)

Return a new point shape based on parameters.
It's mainly used to connection's points or vertex of the shapes.

## Arc(x0, y0, x, y, angle, ratio)

Return a new Arc shape based on parameters.

## Image(x, y, width, height, path, name)

Return a new image based on parameters.