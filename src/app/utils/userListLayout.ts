import { ILayout } from './layout';

declare var jQuery: any;

export class UserListLayout implements ILayout {
    // mobile/table browser navigation bar takes roughly 96px, 
    // so the availbe logical pixel size is always less than the standard view port.
    // http://stackoverflow.com/questions/2880520/how-large-is-the-usable-area-in-ipad-safari
    private browserNavbarHeight = 96 - 23;
    public Resized: boolean  = false;
    reLayout() {
        if(jQuery('#ctb-summary-hidhead').length === 0)
            return;

        let totalHeight = jQuery(window).height();;
        let navbarHeight = jQuery('#globally-fixed').outerHeight();
        navbarHeight += jQuery('#global-header-padding').outerHeight();
        let headHeight = jQuery('#ctb-detail-head').height();
        let footerHeight = jQuery('#ctb-summary-footer').height();

        //let height = totalHeight - navbarHeight - headHeight - footerHeight - this.browserNavbarHeight;
        let height = totalHeight - footerHeight - this.browserNavbarHeight - 30;
        console.log('totalHeight: ' + totalHeight);
        console.log('footerHeight: ' + footerHeight);
        console.log('this.browserNavbarHeight: '+ this.browserNavbarHeight);
        let oldHeight = jQuery('.ctb-detail').height();
        console.log(jQuery('#card-view-container').height());
        jQuery('#card-view-container').height(height);
        console.log(jQuery('#card-view-container').height());

        

        this.Resized = true;
    }
}
