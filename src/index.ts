/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';


/**
 * A base class for creating objects which wrap a DOM node.
 */
export
class NodeWrapper {
  /**
   * Create the DOM node for a new node wrapper instance.
   *
   * @returns The DOM node to use with the node wrapper instance.
   *
   * #### Notes
   * The default implementation creates an empty `<div>`.
   *
   * This may be reimplemented by a subclass to create a custom node.
   */
  static createNode(): HTMLElement {
    return document.createElement('div');
  }

  /**
   * Get the DOM node managed by the wrapper.
   *
   * @returns The DOM node managed by the wrapper.
   *
   * #### Notes
   * This property is read-only.
   */
  get node(): HTMLElement {
    return this._node;
  }

  /**
   * Get the id of the wrapper's DOM node.
   *
   * @returns The id of the DOM node.
   */
  get id(): string {
    return this._node.id;
  }

  /**
   * Set the id of the wrapper's DOM node.
   *
   * @param id - The id to apply to the DOM node.
   */
  set id(id: string) {
    this._node.id = id;
  }

  /**
   * Test whether the wrapper's DOM node has the given class name.
   *
   * @param name - The class name of interest.
   *
   * @returns `true` if the node has the class, `false` otherwise.
   */
  hasClass(name: string): boolean {
    return this._node.classList.contains(name);
  }

  /**
   * Add a class name to the wrapper's DOM node.
   *
   * @param name - The class name to add to the node.
   *
   * #### Notes
   * If the class name is already added to the node, this is a no-op.
   */
  addClass(name: string): void {
    this._node.classList.add(name);
  }

  /**
   * Remove a class name from the wrapper's DOM node.
   *
   * @param name - The class name to remove from the node.
   *
   * #### Notes
   * If the class name is not yet added to the node, this is a no-op.
   */
  removeClass(name: string): void {
    this._node.classList.remove(name);
  }

  /**
   * Toggle class name on the wrapper's DOM node.
   *
   * @param name - The class name to add or remove.
   *
   * @param force - Whether to force add the class (`true`) or force
   *   remove the class (`false`). If not provided, the class will be
   *   added if not present, or removed if present.
   *
   * @returns `true` if the class is now present, `false` otherwise.
   */
  toggleClass(name: string, force?: boolean): boolean {
    var present: boolean;
    if (force === true) {
      this.addClass(name);
      present = true;
    } else if (force === false) {
      this.removeClass(name);
      present = false;
    } else if (this.hasClass(name)) {
      this.removeClass(name);
      present = false;
    } else {
      this.addClass(name);
      present = true;
    }
    return present;
  }

  private _node = (<typeof NodeWrapper>this.constructor).createNode();
}
