var container;

var camera, scene, renderer;

var cube, plane;


var mouseX = 0;
var mouseXOnMouseDown = 0;

var controls;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 150;
	camera.position.z = 500;

	controls = new THREE.TrackballControls( camera );
	controls.target.set( 0, 0, 0 );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = false;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.keys = [ 65, 83, 68 ];
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();
	
	var light = new THREE.PointLight(0xff0000);
	light.position.set(0, 0, 15);
	scene.add(light);


	// Cube
	var geometry = new THREE.CubeGeometry( 200, 200, 200 );

	var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } );

	var materials = [
		new THREE.MeshBasicMaterial( { color: 0x000000, transparent:true, opacity:0.2} ), // right
		new THREE.MeshBasicMaterial( { color: 0x000000, transparent:true, opacity:0.2} ), // left
		new THREE.MeshBasicMaterial( { color: 0x000000, transparent:true, opacity:0.2} ), // top
		new THREE.MeshBasicMaterial( { color: 0x000000, transparent:true, opacity:0.2} ), // bottom
		new THREE.MeshBasicMaterial( { color: 0x000000, transparent:true, opacity:0.2 } ), // back
		new THREE.MeshBasicMaterial( { color: 0x000000, transparent:true, opacity:0.2 } ) // front
	];
	
	cube = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
	cube.position.y = 150;
	scene.add( cube );

	// Plane
	var geometry = new THREE.PlaneGeometry( 200, 200 );
	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	var material = new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } );
	plane = new THREE.Mesh( geometry, material );
	scene.add( plane );

	var face = [];
	//face 1
	var endx = 96;
	var startx = -96;
	var starty = 53;
	var endy = 247;
	var startz = 103;
	var endz = 103;
	var width = Math.abs(startx-endx);
	var number_of_lines = 30;
	var move = width / number_of_lines;
	var material = new THREE.LineBasicMaterial({ color: 0xff00ff,linewidth:1  }); 

	var x = endx;
	var y = endy;
	var bottomx = x-move;
	var bottomy = starty;
	for (var i=0; i< number_of_lines; i++) {
		var geometry2 = new THREE.Geometry(); 
		geometry2.vertices.push(
			new THREE.Vector3( x, y , startz ), 
			new THREE.Vector3( bottomx, bottomy, endz ) 
		); 
		var line = new THREE.Line( geometry2, material ); 
		face[face.length] = line;
		bottomx -= move;
		x = x-(i/number_of_lines);
		y = y-move;
	}

	material = new THREE.LineBasicMaterial({ color: 0x00ffff,linewidth:1  }); 
	x = startx;
	y = endy;
	bottomx = x+move;
	bottomy = starty;

	for (var i=0; i< number_of_lines; i++) {
		var geometry2 = new THREE.Geometry(); 
		geometry2.vertices.push(
			new THREE.Vector3( x, y , startz ), 
			new THREE.Vector3( bottomx, bottomy, endz ) 
		); 
		var line = new THREE.Line( geometry2, material ); 
		face[face.length] = line;
		bottomx += move;
		x = x-(i/number_of_lines);
		y = y-move;
	}

	material = new THREE.LineBasicMaterial({ color: 0xFFff00,linewidth:1  }); 
	x = startx;
	y = endy;
	bottomx = endx;
	bottomy = y-move;


	for (var i=0; i< number_of_lines; i++) {
		var geometry2 = new THREE.Geometry(); 
		geometry2.vertices.push(
			new THREE.Vector3( x, y , startz ), 
			new THREE.Vector3( bottomx, bottomy, endz ) 
		); 
		var line = new THREE.Line( geometry2, material ); 
		face[face.length] = line;

		bottomy -= move;
		y = y+(i/number_of_lines);
		x = x+move;
	}

	material = new THREE.LineBasicMaterial({ color: 0xFF0f0f,linewidth:1  }); 
	var x = startx;
	var y = starty;
	var bottomx = x+move;
	var bottomy = endy;
	for (var i=0; i< number_of_lines; i++) {
		var geometry2 = new THREE.Geometry(); 
		geometry2.vertices.push(
			new THREE.Vector3( x, y , startz ), 
			new THREE.Vector3( bottomx, bottomy, endz ) 
		); 
		var line = new THREE.Line( geometry2, material ); 
		face[face.length] = line;
		bottomx += move;
		x = x+(i/number_of_lines);
		y = y+move;
	}

	//front
	for (var i in face) {
		scene.add(face[i]);
	}
	
	//bottom
	for (var i in face) {
		var newside = new THREE.Line( face[i].geometry, face[i].material ); 
		newside.rotation.x = 1.5707963217948966;
		newside.position.set(0.0, 150, -150);
		scene.add(newside);
	}

	//top
	for (var i in face) {
		var newside = new THREE.Line( face[i].geometry, face[i].material ); 
		newside.rotation.x = 1.5707963217948966;
		newside.position.set(0.0, 350, -150);
		scene.add(newside);
	}


	//back
	for (var i in face) {
		var newside = new THREE.Line( face[i].geometry, face[i].material ); 
		newside.position.set(0.0, 0, -190);
		scene.add(newside);
	}

	//right
	for (var i in face) {
		var newside = new THREE.Line( face[i].geometry, face[i].material ); 
		newside.rotation.y = 1.5707963217948966;
		newside.position.set(-7, 0, 0);
		scene.add(newside);
	}

	//left
	for (var i in face) {
		var newside = new THREE.Line( face[i].geometry, face[i].material ); 
		newside.rotation.y = -1.5707963217948966;
		newside.position.set(7, 0, 0);
		scene.add(newside);
	}




	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	//
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	controls.handleResize();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

//
function animate() {
	requestAnimationFrame( animate );
	render();
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}

