import {assert, expect} from 'chai';
import Vector2d from '../src/lib/vector2d';
const v2d = new Vector2d();

const instMethods = 'add, sub, mult, div, limit, zero, copy, rotate, rotateDeg, dot, heading, angleBetween, angleTo, lerpTo'.split(', ');

describe('Vector2d', function() {

  describe('#Vector2d()',function(){
    it('should be instance of Vector2d', function() {
      expect(v2d).to.be.instanceOf(Vector2d);
    });
    it('should have static methods lerp deg2rad rad2deg', function() {
      // static methods
      expect(Vector2d).itself.to.respondTo('deg2rad');
      expect(Vector2d).itself.to.respondTo('rad2deg');
      expect(Vector2d).itself.to.respondTo('lerp');
    });
    it(`should respond to ${instMethods.join(', ')}`, function() {
      instMethods.forEach(m => {
        expect(v2d).itself.to.respondTo(m);
      });
      //expect(v2d).itself.to.respondTo('inside');
      //expect(v2d).itself.to.respondTo('outside');

    });
    it('should return {x:0,y:0} no args are given', function() {
      expect(v2d.x).to.be.equal(0);
      expect(v2d.y).to.be.equal(0);
    });
  });

  describe('#Vector2d.add()',function(){
    it('should equal {x:-10,y:50}', function() {
      const vc1 = new Vector2d(15,30);
      vc1.add( new Vector2d(-25,20) );
      expect(vc1.x).to.be.equal(-10);
      expect(vc1.y).to.be.equal(50);
    });
  });

  describe('#Vector2d.sub()',function(){
    it('should equal {x:-90,y:40}', function() {
      const vc1 = new Vector2d(10,20);
      vc1.sub( new Vector2d(100,-20) );
      expect(vc1.x).to.be.equal(-90);
      expect(vc1.y).to.be.equal(40);
    });
  });

  describe('#Vector2d.mult()',function(){
    it('should equal {x:-300,y:12}', function() {
      const vc1 = new Vector2d(3,3);
      vc1.mult( -100 );
      expect(vc1.x).to.be.equal(-300);
      expect(vc1.y).to.be.equal(-300);
    });
  });

  describe('#Vector2d.div()',function(){
    it('should equal {x:-9,y:100}', function() {
      const vc1 = new Vector2d(81,360);
      vc1.div( 9 );
      expect(vc1.x).to.be.equal(9);
      expect(vc1.y).to.be.equal(40);
    });
  });

  // describe('#Vector2d.limit()',function(){
  //   it('should equal {x:10,y:10}', function() {
  //     const vc1 = new Vector2d(81,300);
  //     vc1.add( new Vector2d(-9,3) );
  //     expect(vc1.limit(10).x).to.be.equal(10);
  //     expect(vc1.limit(10).y).to.be.equal(10);
  //   });
  // });

  describe('#Vector2d.zero()',function(){
    it('should equal {x:0,y:0}', function() {
      const vc1 = new Vector2d(81,300);
      vc1.zero();
      expect(vc1.x).to.be.equal(0);
      expect(vc1.y).to.be.equal(0);
    });
  });

  describe('#Vector2d.copy()',function(){
    it('should equal {x:20,y:50}', function() {
      const vc1 = new Vector2d(20,50);
      const vc2 = vc1.copy();
      expect(vc2.x).to.be.equal(20);
      expect(vc2.y).to.be.equal(50);
    });
  });

  describe('#Vector2d.rotate(radians)',function(){
    it('should equal {x:-50.000000000000014,y:-100}', function() {
      const vc1 = new Vector2d(50,100);
      vc1.rotate(Math.PI);
      //expect(vc1.x).to.be.equal(-50.000000000000014);
      expect(vc1.y).to.be.equal(-100);
    });
  });

  describe('#Vector2d.rotateDeg(degrees)',function(){
    it('should equal {x:-50.000000000000014,y:-100}', function() {
      const vc1 = new Vector2d(50,100);
      vc1.rotateDeg(180);
      expect(vc1.y).to.be.equal(-100);
    });
  });

  describe('#Vector2d.heading()', function(){
    it('should equal 1.5707963267948966 rad aka 90 deg', function() {
      const v = new Vector2d(0,1);
      const v2 = new Vector2d(1,0);
      expect(v.heading()).to.be.equal(1.5707963267948966);
      expect(Vector2d.rad2deg(v.heading())).to.be.equal(90);
      expect(Vector2d.rad2deg(v2.heading())).to.be.equal(0);
    });
  });

  describe('#Vector2d.angleBetween()', function(){
    it('should equal Math.PI rad aka 180 deg', function() {
      const v = new Vector2d(0,0);
      const v2 = new Vector2d(-1,0);
      expect(v.angleBetween(v2)).to.be.equal(Math.PI);
    });
  });

  describe('#Vector2d.dot()', function(){
    it('should equal Math.PI rad aka 180 deg', function() {
      const v = new Vector2d(1,1);
      const v2 = new Vector2d(-1,0);
      expect(v.dot(v2)).to.be.equal(-1);
    });
  });

  describe('#Vector2d.lerpTo()', function(){
    it('should equal {x: 75, y: 1.5}', function() {
      const v1 = new Vector2d(0, 0);
      const v2 = new Vector2d(100, 2);
      expect(v1.lerpTo(v2, 0.75).x).to.be.equal(75);
      expect(v1.lerpTo(v2, 0.75).y).to.be.equal(1.5);
    });
  });


  describe('#Vector2d.lerp()', function(){
    it('should equal 35', function() {
      expect(Vector2d.lerp(0, 100, 0.35)).to.be.equal(35);
    });
  });

  describe('#Vector2d.deg2rad()', function(){
    it('should equal Math.PI', function() {
      expect(Vector2d.deg2rad(180)).to.be.equal(Math.PI);
    });
  });

  describe('#Vector2d.rad2deg()', function(){
    it('should equal 90', function() {
      expect(Vector2d.rad2deg(Math.PI/4)).to.be.equal(45);
    });
  });


});