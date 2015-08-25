/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import expect = require('expect.js');

import {
  NodeWrapper
} from '../../lib/index';


class CustomWrapper extends NodeWrapper {

  static createNode(): HTMLElement {
    return document.createElement('button');
  }
}


describe('phosphor-nodewrapper', () => {

  describe('NodeWrapper', () => {

    describe('.createNode()', () => {

      it('should create a div by default', () => {
        var node = NodeWrapper.createNode();
        expect(node.tagName).to.be('DIV');
      });

      it('should be overridable by a subclass', () => {
        var node = CustomWrapper.createNode();
        expect(node.tagName).to.be('BUTTON');
      });

      it('should be called to create the wrapper node', () => {
        var wrapper1 = new NodeWrapper();
        var wrapper2 = new NodeWrapper();
        expect(!!wrapper1.node).to.be(true);
        expect(!!wrapper2.node).to.be(true);
        expect(wrapper1.node === wrapper2.node).to.be(false);
      });

    });

    describe('constructor', () => {

      it('should accept no arguments', () => {
        var wrapper = new NodeWrapper();
        expect(wrapper instanceof NodeWrapper).to.be(true);
      });

    });

    describe('#node', () => {

      it('should return the node for the wrapper', () => {
        var wrapper1 = new NodeWrapper();
        var wrapper2 = new CustomWrapper();
        expect(wrapper1.node.tagName).to.be('DIV');
        expect(wrapper2.node.tagName).to.be('BUTTON');
      });

      it('should be read-only', () => {
        var wrapper = new NodeWrapper();
        expect(() => { wrapper.node = null; }).to.throwException();
      });

    });

    describe('#id', () => {

      it('should return the id for the DOM node', () => {
        var wrapper = new NodeWrapper();
        expect(wrapper.id).to.be('');
        wrapper.node.id = 'foo';
        expect(wrapper.id).to.be('foo');
      });

      it('should set the id for the DOM node', () => {
        var wrapper = new NodeWrapper();
        expect(wrapper.node.id).to.be('');
        wrapper.id = 'foo';
        expect(wrapper.node.id).to.be('foo');
      });

    });

    describe('#hasClass()', () => {

      it('should return `true` if a node has a class', () => {
        var wrapper = new NodeWrapper();
        wrapper.node.classList.add('foo');
        wrapper.node.classList.add('bar');
        wrapper.node.classList.add('baz');
        expect(wrapper.hasClass('foo')).to.be(true);
        expect(wrapper.hasClass('bar')).to.be(true);
        expect(wrapper.hasClass('baz')).to.be(true);
      });

      it('should return `false` if a node does not have a class', () => {
        var wrapper = new NodeWrapper();
        wrapper.node.classList.add('foo');
        wrapper.node.classList.add('bar');
        wrapper.node.classList.add('baz');
        expect(wrapper.hasClass('one')).to.be(false);
        expect(wrapper.hasClass('two')).to.be(false);
        expect(wrapper.hasClass('three')).to.be(false);
      });

    });

    describe('#addClass()', () => {

      it('should add a class to the DOM node', () => {
        var wrapper = new NodeWrapper();
        expect(wrapper.node.classList.contains('foo')).to.be(false);
        wrapper.addClass('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(true);
        expect(wrapper.node.classList.contains('bar')).to.be(false);
        wrapper.addClass('bar');
        expect(wrapper.node.classList.contains('bar')).to.be(true);
      });

      it('should be a no-op if the class is already present', () => {
        var wrapper = new NodeWrapper();
        wrapper.addClass('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(true);
        wrapper.addClass('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(true);
      });

    });

    describe('#removeClass()', () => {

      it('should remove the class from the DOM node', () => {
        var wrapper = new NodeWrapper();
        wrapper.node.classList.add('foo');
        wrapper.node.classList.add('bar');
        wrapper.removeClass('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(false);
        expect(wrapper.node.classList.contains('bar')).to.be(true);
        wrapper.removeClass('bar');
        expect(wrapper.node.classList.contains('bar')).to.be(false);
      });

      it('should be a no-op if the class is not present', () => {
        var wrapper = new NodeWrapper();
        expect(wrapper.node.classList.contains('foo')).to.be(false);
        wrapper.removeClass('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(false);
      });

    });

    describe('#toggleClass()', () => {

      it('should toggle the presence of a class', () => {
        var wrapper = new NodeWrapper();
        wrapper.toggleClass('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(true);
        wrapper.toggleClass('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(false);
      });

      it('should force-add a class', () => {
        var wrapper = new NodeWrapper();
        expect(wrapper.node.classList.contains('foo')).to.be(false);
        wrapper.toggleClass('foo', true);
        expect(wrapper.node.classList.contains('foo')).to.be(true);
        wrapper.toggleClass('foo', true);
        expect(wrapper.node.classList.contains('foo')).to.be(true);
      });

      it('should force-remove a class', () => {
        var wrapper = new NodeWrapper();
        wrapper.node.classList.add('foo');
        expect(wrapper.node.classList.contains('foo')).to.be(true);
        wrapper.toggleClass('foo', false);
        expect(wrapper.node.classList.contains('foo')).to.be(false);
        wrapper.toggleClass('foo', false);
        expect(wrapper.node.classList.contains('foo')).to.be(false);
      });

      it('should return `true` if the class is present', () => {
        var wrapper = new NodeWrapper();
        expect(wrapper.toggleClass('foo')).to.be(true);
        expect(wrapper.toggleClass('foo', true)).to.be(true);
      });

      it('should return `false` if the class is not present', () => {
        var wrapper = new NodeWrapper();
        wrapper.node.classList.add('foo');
        expect(wrapper.toggleClass('foo')).to.be(false);
        expect(wrapper.toggleClass('foo', false)).to.be(false);
      });

    });

  });

});
