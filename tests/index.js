import { MyPlugin as MyPluginDll, icons } from '../src';
import Togglelist from '../src/togglelist';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Togglelist DLL', () => {
	it( 'exports Togglelist', () => {
		expect( MyPluginDll ).to.equal( Togglelist );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
