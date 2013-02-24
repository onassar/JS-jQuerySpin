JS-jQuerySpin
=============

Overlays desired DOM element(s) with a spinner, fading out the background. Nothing required other than the script.

I have two working examples available to test at: <http://web.onassar.com/blog/2013/02/23/jquery-plugin-jquery-spin-overlay-spinner-plugin/>

#### Two Examples

    $('ul#list li').spin();

This will grab each `li` element under the `ul#list` element, apply an overlay, and then center/vertically align a spinner over it. To turn them off, you simply make another call to `$('ul#list li').spin();`

	$(window).spin();

This will place an overlay over the `html` element (which generally includes the entire page). It will as well center/vertically align the spinner, but the spinner will be fixed such that if you scroll, it'll stay with you.

For (slightly) more info, check my post out: <http://web.onassar.com/blog/2013/02/23/jquery-plugin-jquery-spin-overlay-spinner-plugin/>