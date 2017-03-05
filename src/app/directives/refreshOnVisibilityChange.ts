import {Directive, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
//import {Router, RouteParams} from '@angular/router-deprecated';
import { Router }   from '@angular/router';

@Directive({ selector: '[refresh-on-visibility-change]' })
export class RefreshOnVisibilityChangeDirective {

	// http://stackoverflow.com/questions/1060008/is-there-a-way-to-detect-if-a-browser-window-is-not-currently-active
	// http://stackoverflow.com/questions/37225119/angular-2-routing-to-the-same-route/37225256#37225256
	constructor(private router: Router) {
		var currentlyVisible = true;

		if ('hidden' in document)
			document.addEventListener('visibilitychange', onchange);
		else if ('mozHidden' in document)
			document.addEventListener('mozvisibilitychange', onchange);
		else if ('webkitHidden' in document)
			document.addEventListener('webkitvisibilitychange', onchange);
		else if ('msHidden' in document)
			document.addEventListener('msvisibilitychange', onchange);
		else if ('onfocusin' in document) {
			(<any>document).onfocusin = onshow;
			(<any>document).onfocusout = onhide;
		} else {
			window.onpageshow = window.onfocus = onshow;
			window.onpagehide = window.onblur = onhide;
		}

		/**
		 * For recent browsers, this occurs both on leaving and on returning.
		 * @param evt
		 */
		function onchange(evt: any) {
			currentlyVisible = !currentlyVisible;
			refresh();
		}

		/**
		 * For older browsers.
		 * @param evt
		 */
		function onshow(evt: any) {
			currentlyVisible = true;
			refresh();
		}

		/**
		 * For older browsers.
		 * @param evt
		 */
		function onhide(evt: any) {
			currentlyVisible = false;
		}

		function refresh() {
			if (currentlyVisible) {
				
			}
		}
	}
}