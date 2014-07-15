#Image-Mapper

Playing around with various ways to achieve the same image-mapping tool.

Initialize hotspot by clicking anywhere on the image.  Click on another location over the image to initialize your second coordinate and begin drawing a path connecting them.  When you are done with your polygonal shape you can double click to finish path and begin a new one.

### Environment Support

- IE 8/9
- Support for IE6 is in the roadmap.  Our bottleneck for this is HTML Canvas.
- iOS (Video/Image)
- Android (Image Only)
- Blackberry/All other current devices (Image Only)
- Hybrid/Non-Native (Video/Image/GIF/Browser Plugin)


###TODO

- Customizable paths (line color)
- Update data-model for embed (object -> array(x))
- Better UI
- Work on embedding
- Work on cross-browser stuff

### Sample Markup

In the live demo linked above you can see that when you begin clicking over the image and creating hotspots, in the background we are also creating and displaying the necessary markup to implement your hotspot.  We're using HTML Canvas here and almost everything is Native and eventually will work across all browsers down to IE6 but for now, our bottleneck is browser-support for HTML Canvas in IE8/9.

Here is sample markup

`<img src="path/to/img.jpg" width="350" height="500" alt="Planets" usemap="#image_map">`

`<map name="image_map" id="image_map">
     <area shape="poly" coords="90,58,3,118" href="www.google.com" alt="google">
 </map>`

`<canvas id="my-canvas" height="350" width="500"></canvas>`


### Working With Code

The actions here are a bit muddy because I'm configuring integration across multiple devices/environments and trying to make this as compatible as possible.  For example, the goal is to make this as viable and compliant enterprise software.  

The high-level actions are as follows...

Begin Hotspot -> Create Points -> Finish Hotspot -> Add Data -> Send to DB -> Embed -> Cleanup, Finish, Update UI

Coordinates are stored in this object

`coordinates`

Each set of coordinates(hotspot) are stored as a named array inside of the coordinates object.  They can be accessed like this...

`coordinates.coordinate_1`

And of course you're free to do things like...

`coordinates.coordinate_1[0]`

`coordinates.coordinate_1.length`

### Contributing

Not accepting contributions currently but if you're interested in this project and want to talk about it, reach out to me through email and I'll get you up-to-speed and we can also talk about when I'll be ready to start taking pull requests.


### Questions, Comments, Concerns?

Feel free to contact me through my email in profile










