import{_ as e,o as t,c as a,a as l}from"./app.20e85b2d.js";const f=JSON.parse('{"title":"move(dx, dy)","description":"","frontmatter":{},"headers":[{"level":2,"title":"move(dx, dy)","slug":"move-dx-dy"},{"level":2,"title":"addChild(child, translate = null, rotate = null, drawing = true)","slug":"addchild-child-translate-null-rotate-null-drawing-true"},{"level":2,"title":"remove()","slug":"remove"},{"level":2,"title":"addEvent(event, callback)","slug":"addevent-event-callback"},{"level":2,"title":"deleteEvent(event)","slug":"deleteevent-event"},{"level":2,"title":"deleteAllEvents()","slug":"deleteallevents"},{"level":2,"title":"draw()","slug":"draw"},{"level":2,"title":"redraw()","slug":"redraw"},{"level":2,"title":"removeFromDOM()","slug":"removefromdom"},{"level":2,"title":"drawVertex()","slug":"drawvertex"},{"level":2,"title":"drawConnector()","slug":"drawconnector"}],"relativePath":"api/component.md","lastUpdated":null}'),n={name:"api/component.md"},r=l('<p>In this part of api&#39;s specification, we&#39;re going to categorize according to the type of shape.</p><p>We consider that rectangle, lozenge, circle, line as basic shapes derived from the same components. Each of this shape has some vertex and connection points. Vertex are upper corners of the shape by which we can resize the shape. The connection points are the middle of the shape by which we can create a link with another one.</p><p>Below we have the main attributes inside the table and main functions listed that all the shape have.</p><table><thead><tr><th style="text-align:center;">Attributes&#39;s name</th><th style="text-align:center;">Description</th></tr></thead><tbody><tr><td style="text-align:center;">uuid</td><td style="text-align:center;">Id of the component</td></tr><tr><td style="text-align:center;">type</td><td style="text-align:center;">Type of component or shape, useful in order to draw the appropriate shape.</td></tr><tr><td style="text-align:center;">events</td><td style="text-align:center;">Dictionary object to record events and their respective callbacks associated with specific shape.</td></tr><tr><td style="text-align:center;">config</td><td style="text-align:center;">Allows you to access the basic configurations of aya.</td></tr><tr><td style="text-align:center;">c_svg</td><td style="text-align:center;">Represents the svg dom element created.</td></tr><tr><td style="text-align:center;">svg</td><td style="text-align:center;">SVG document in which the shape is drawn.</td></tr><tr><td style="text-align:center;">children</td><td style="text-align:center;">A table listing all component&#39;s children.</td></tr><tr><td style="text-align:center;">offsetX</td><td style="text-align:center;">The offsetX represents the x-offset to be applied to the rectangle. To position it at {this. x + this.offsetX} on the x-axis.</td></tr><tr><td style="text-align:center;">offsetY</td><td style="text-align:center;">The offsetY represents the y-offset to be applied to the rectangle. To position it at {this. y + this.offsetX} on the y-axis.</td></tr><tr><td style="text-align:center;">scaleX</td><td style="text-align:center;">The ScaleX represents the scale to be applied to the size of the shape on the x-axis.</td></tr><tr><td style="text-align:center;">scaleY</td><td style="text-align:center;">The ScaleX represents the scale to be applied to the size of the shape on the x-axis.</td></tr><tr><td style="text-align:center;">angle</td><td style="text-align:center;">This variable represents the value of the rotation angle to be applied to rotate the shape.</td></tr><tr><td style="text-align:center;">centerX</td><td style="text-align:center;">The abscissa of the center of rotation is defined by defining centerX.</td></tr><tr><td style="text-align:center;">centerY</td><td style="text-align:center;">The ordinate of the center of rotation is defined by defining centerY.</td></tr><tr><td style="text-align:center;">c_points</td><td style="text-align:center;">The variable c_points represents all the connection points of the form. These are the points from which one can establish a link with other forms having also these connection points.</td></tr><tr><td style="text-align:center;">vertex</td><td style="text-align:center;">The vertex variable represents the set of points from which we can resize the shape.</td></tr></tbody></table><h2 id="move-dx-dy" tabindex="-1">move(dx, dy) <a class="header-anchor" href="#move-dx-dy" aria-hidden="true">#</a></h2><ul><li>We can build any shape by adding to a basic component a children shape.</li><li>@param { Number } dx - dx represents the value added to the abscissa.</li><li>@param { Number } dy - dy represents the value added to the ordinate.</li></ul><h2 id="addchild-child-translate-null-rotate-null-drawing-true" tabindex="-1">addChild(child, translate = null, rotate = null, drawing = true) <a class="header-anchor" href="#addchild-child-translate-null-rotate-null-drawing-true" aria-hidden="true">#</a></h2><ul><li>We can build any shape by adding to a basic component a children shape.</li><li>@param { (Rectangle | Lozenge | Triangle | Circle | Line | Text) } child - This shape ( @extend Shape) is added as a child to a component.</li><li>@param { Object } translate - { x, y } This object allows us to position the child relative to its parent.</li><li>@param {Object } rotate - { x, y } This object allows us to define the center of rotation.</li></ul><h2 id="remove" tabindex="-1">remove() <a class="header-anchor" href="#remove" aria-hidden="true">#</a></h2><ul><li>We can remove any component by calling this method. It removes the shape from the dom and deletes it from the register.</li></ul><h2 id="addevent-event-callback" tabindex="-1">addEvent(event, callback) <a class="header-anchor" href="#addevent-event-callback" aria-hidden="true">#</a></h2><ul><li>This method allows us to add an event to the shape.</li><li>We record the event and the associated callback for easy removal after.</li><li>@param { String } event - the event</li><li>@param { Function } callback - {} This callback is either defined by the user when</li><li>adding other custom events, or a callback already defined in event.js.</li></ul><h2 id="deleteevent-event" tabindex="-1">deleteEvent(event) <a class="header-anchor" href="#deleteevent-event" aria-hidden="true">#</a></h2><ul><li>This method allows us to delete a specific event passed as a string parameter.</li><li>@param { String } event - The event.</li></ul><h2 id="deleteallevents" tabindex="-1">deleteAllEvents() <a class="header-anchor" href="#deleteallevents" aria-hidden="true">#</a></h2><ul><li>This method allows us to delete all the events defined on the shape.</li></ul><h2 id="draw" tabindex="-1">draw() <a class="header-anchor" href="#draw" aria-hidden="true">#</a></h2><ul><li>Draw the shape into the svg document.</li></ul><h2 id="redraw" tabindex="-1">redraw() <a class="header-anchor" href="#redraw" aria-hidden="true">#</a></h2><ul><li>Redraw the shape into the svg document.</li></ul><h2 id="removefromdom" tabindex="-1">removeFromDOM() <a class="header-anchor" href="#removefromdom" aria-hidden="true">#</a></h2><ul><li>Remove the shape from the DOM.</li></ul><h2 id="drawvertex" tabindex="-1">drawVertex() <a class="header-anchor" href="#drawvertex" aria-hidden="true">#</a></h2><ul><li>Use to calculate the position of each vertex according to the specificity of the shape.</li></ul><h2 id="drawconnector" tabindex="-1">drawConnector() <a class="header-anchor" href="#drawconnector" aria-hidden="true">#</a></h2><ul><li>Use to calculate the position of each connection point according to the specificity of the shape.</li></ul>',26),i=[r];function d(s,o,h,c,p,u){return t(),a("div",null,i)}var g=e(n,[["render",d]]);export{f as __pageData,g as default};
