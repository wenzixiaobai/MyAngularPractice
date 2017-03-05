import {EventEmitter} from '@angular/core';

export class GlobalHeaderConfig {
	option1Text: string = "";
	option2Text: string = "";
	option3Text: string = "";
	showLogo: boolean = true;

	selectedOptionNumber: number = -1;
	selectedOptionText: string = "NOT SET ERROR";

	isTextHeader(): boolean {
		return this.option1Text != "" || this.option2Text != "" || this.option3Text != ""
	}
}

export class GlobalHeaderService {
	optionClickedEvent: EventEmitter<any> = new EventEmitter();
	setupHeaderEvent: EventEmitter<any> = new EventEmitter();
	refreshEvent: EventEmitter<any> = new EventEmitter();

	get isSmallWindow(): boolean { return window.innerWidth < 768; }
	currentConfig: GlobalHeaderConfig;

	viewBag: any;

	isWindowSmall(): boolean {
		//For jasmine
		return this.isSmallWindow;
	}

	onOption(num, config) {
		config.selectedOption = num;
		switch (num) {
			case 1:
				config.selectedOptionText = config.option1Text;
				break;
			case 2:
				config.selectedOptionText = config.option2Text;
				break;
			case 3:
				config.selectedOptionText = config.option3Text;
				break;
		}
		this.optionClickedEvent.next(config);
	}

	setDefault() {
		this.configureHeader("", "", "", true);
	}

	refresh() {
		this.refreshEvent.next(this.currentConfig);
	}

	configureHeader(opt1, opt2, opt3,showLogo) {
		var config = new GlobalHeaderConfig();
		this.currentConfig = config;
		config.option1Text = opt1;
		config.option2Text = opt2;
		config.option3Text = opt3;
		config.showLogo = showLogo;

		this.setupHeaderEvent.next(config);
	}
}