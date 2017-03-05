import { ILayout } from './layout';

declare var jQuery: any;

export class UserListLayout implements ILayout {
    // mobile/table browser navigation bar takes roughly 96px, 
    // so the availbe logical pixel size is always less than the standard view port.
    // http://stackoverflow.com/questions/2880520/how-large-is-the-usable-area-in-ipad-safari
    private browserNavbarHeight = 96 - 23;
    public Resized: boolean  = false;
    reLayout() {
        
        let totalHeight = jQuery(window).innerHeight();
        let headHeight = jQuery('#detail-head').position().top + 130;
        let footerHeight = jQuery('#ctb-summary-footer').height();
        console.log(totalHeight);
        console.log(jQuery('#detail-head').height());
        console.log(footerHeight);
        
        
        let divHeight = jQuery('#div-alert').height(); 
        //let height = totalHeight - navbarHeight - headHeight - footerHeight - this.browserNavbarHeight;
        let height = totalHeight - headHeight - footerHeight;//- this.browserNavbarHeight - 30;
       
        let oldHeight = jQuery('.ctb-detail').height();
        
        jQuery('#card-view-container').height(height);
        

        

        this.Resized = true;
    }
}
