import { Component, ElementRef, OnInit, Input, Renderer2 } from '@angular/core';
import * as NodeHelper from '../../utils/NodeHelper';

const KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  UP: 38
};

const roleAttributeName = 'role';

@Component({
  selector: 'app-tab-swicher',
  template: `<div><ng-content></ng-content></div>`
})
export class TabSwicherComponent implements OnInit {

  constructor(private _element: ElementRef<HTMLDivElement>,
    private _renderer: Renderer2) {
    this._nativeElement = _element.nativeElement;
  }

  @Input() role = 'group';


  private _nativeElement: HTMLDivElement;

  ngOnInit(): void {
    const childDivElements = Array.from(this._nativeElement.querySelectorAll<HTMLDivElement>(`[role=${this.role}]`));

    childDivElements.forEach(element => {
      this._renderer.listen(element, 'click', this._onClick.bind(this));
      this._renderer.listen(element, 'keydown', this._onKeyDown.bind(this));

      this._disableTabIndex(element);
    });

    if (childDivElements.length !== 0) {
      childDivElements[0].tabIndex = 0;
    }
  }

  private _disableTabIndex(element: HTMLElement) {
    NodeHelper.breadthSearch(element, node => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const htmlElement = node as HTMLElement;
      if (htmlElement) {
        htmlElement.tabIndex = -1;

        if (htmlElement !== element) {
          this._removeRoleAttributeWithSameValue(htmlElement);
        }
      }
    });
  }

  private _removeRoleAttributeWithSameValue(element: HTMLElement) {
    if (element.hasAttribute(roleAttributeName)
      && element.getAttribute(roleAttributeName) === this.role) {
      element.removeAttribute(roleAttributeName);
    }
  }

  private _onClick(event: Event) {
    const target = event.srcElement as HTMLElement;
    if (target.getAttribute(roleAttributeName) === this.role) {
      this._disableNodesTabSelection(target);

      this._changeTabSelection(target, true);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _onKeyDown(event: KeyboardEvent) {
    const target = event.srcElement;
    let next: HTMLElement;

    switch (event.keyCode) {
      case KEYCODE.DOWN:
      case KEYCODE.RIGHT:
        next = NodeHelper.nextElementByRole(target, this.role);
        if (!next) {
          next = NodeHelper.firstElementByRole(target, this.role);
        }
        break;

      case KEYCODE.UP:
      case KEYCODE.LEFT:
        next = NodeHelper.previousElementByRole(target, this.role);
        if (!next) {
          next = NodeHelper.lastElementByRole(target, this.role);
        }
        break;

      default:
        return;
    }

    if (next) {
      this._disableNodesTabSelection(next);

      this._changeTabSelection(next, true);
    }

    event.preventDefault();
    event.stopPropagation();
  }

  private _disableNodesTabSelection(startNode: HTMLElement) {
    let element = NodeHelper.firstElementByRole(startNode, this.role);

    while (element) {
      this._changeTabSelection(element, false);
      element = NodeHelper.nextElementByRole(element, this.role);
    }
  }

  private _changeTabSelection(element: HTMLElement, state: boolean) {
    if (state) {
      element.tabIndex = 0;
      element.focus();
    } else {
      element.tabIndex = -1;
    }
  }
}
