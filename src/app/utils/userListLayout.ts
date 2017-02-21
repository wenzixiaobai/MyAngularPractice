import { ILayout } from './layout';

declare var jQuery: any;

export class UserListLayout implements ILayout {
    // mobile/table browser navigation bar takes roughly 96px, 
    // so the availbe logical pixel size is always less than the standard view port.
    // http://stackoverflow.com/questions/2880520/how-large-is-the-usable-area-in-ipad-safari
    private browserNavbarHeight = 96 - 23;

    reLayout() {

        let totalHeight = window.innerHeight;
        //let navbarHeight = jQuery('#globally-fixed').outerHeight();
        let tableHead = jQuery('#ctb-detail-head').height();
        let footerHeight = jQuery('#ctb-summary-footer').height();
        let height = totalHeight - jQuery('#ctb-detail-head').position().top - tableHead - footerHeight - 42;

        jQuery('#card-view-container').height(height);
        let fixheadHeight = jQuery('#ctb-summary-hidhead').height() - 5;
        jQuery('#ctb-summary-fixhead').height(fixheadHeight);

        if(jQuery('#ctb-summary-hidhead').height() - jQuery('#ctb-summary-hidvalue').height() > 5) {
            let padding = (jQuery('#ctb-summary-fixhead').outerHeight() - fixheadHeight) / 2;
            jQuery('#ctb-summary-fixhead').css('padding-top', padding + (fixheadHeight - 20) / 2);
        }

        jQuery('#ctb-summary-fixvalue').height(jQuery('#ctb-summary-hidvalue').height() - 2);
        jQuery('#ctb-summary-fixhead').css({ 'top': jQuery('#ctb-summary-footer').position().top + 2});
    }
}
