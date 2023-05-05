In this part of api's specification, we're going to categorize according to the type of shape.

We consider Rectangle, Lozenge, Circle, Line, as basic shapes.
Each of this shape has some vertex and connection points.
Vertex are upper corners of the shape by which we can resize the shape.
The connection points are the middle of the shape by which we can create a link with another one.

Below we have the main attributes inside the table and main functions listed that all the shape have.

| Attributes's name                         | Description
| :-------------:                           |:-------------:|
| events                                    |   Dictionary object to record events and their respective callbacks associated with specific shape.
| config                                    | Allows you to access the basic configurations of aya.    |
| c_svg                                     |      Represents the svg dom element created.    |
| svg                                       | SVG document in which the shape is drawn.     |
| type                                      | Type of the shape.    |
| svg                                       | svg document in which the shape is drawn     |
| children                                  |   A table listing all children of the shape.|
| offsetX                                   |      The offsetX represents the x-offset to be applied to the rectangle. To position it at {this. x + this.offsetX} on the x-axis.|
| offsetY                                   |      The offsetY represents the y-offset to be applied to the rectangle. To position it at {this. y + this.offsetX} on the y-axis.|
| scaleX                                    |       The ScaleX represents the scale to be applied to the size of the shape on the x-axis.|
| scaleY                                    |     The ScaleX represents the scale to be applied to the size of the shape on the x-axis.    |
| angle                                     |      This variable represents the value of the rotation angle to be applied to rotate the shape.     |
| centerX                                   |    The abscissa of the center of rotation is defined by defining centerX.   |
| centerY                                   |    The ordinate of the center of rotation is defined by defining centerY.   |
| c_points                                  |   The variable c_points represents all the connection points of the form. These are the points from which one can establish a link with other forms having also these connection points.    |
| vertex                                    |   The vertex variable represents the set of points from which we can resize the shape.  |


## addEvent(event, callback)

   * This method allows us to add an event to the shape.
   * We record the event and the associated callback for easy removal after.
   * @param { String } event - the event
   * @param { Function } callback - {} This callback is either defined by the user when
   * adding other custom events, or a callback already defined in event.js.

## deleteEvent(event)

   * This method allows us to delete a specific event passed as a string parameter.
   * @param { String } event - The event.

## deleteAllEvents()

   * This method allows us to delete all the events defined on the shape.

## draw()
* Draw the shape into the svg document.


## redraw()
* Redraw the shape into the svg document.

## removeFromDOM()

* Remove the shape from the DOM.

## drawVertex()

   * The drawVertex function simply calculates the position of each vertex according to the specificity of the shape.

## drawConnector()

   * The drawConnector function simply calculates the position of each connection point according to the specificity of the shape.