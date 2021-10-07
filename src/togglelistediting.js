import { Plugin } from 'ckeditor5/src/core';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertToggleListCommand from './inserttogglelistcommand';

import '../theme/toggle-list.css';

export default class ToggleListEditing extends Plugin {

  static get requires() {
	return [ Widget ];
  }


  init() {
	console.log( 'ToggleListEditing#init() got called' );

	this._defineSchema();
	this._defineConverters();

	this.editor.commands.add( 'insertToggleList', new InsertToggleListCommand( this.editor ) );
  }

  _defineSchema() {                                                          // ADDED
	const schema = this.editor.model.schema;

	schema.register( 'toggleList', {
	  // Behaves like a self-contained object (e.g. an image).
	  isObject: true,

	  // Allow in places where other blocks are allowed (e.g. directly in the root).
	  allowWhere: '$block'
	} );

	schema.register( 'toggleListTitle', {
	  // Cannot be split or left by the caret.
	  isLimit: true,

	  allowIn: 'toggleList',

	  // Allow content which is allowed in blocks (i.e. text with attributes).
	  allowContentOf: '$block'
	} );



	schema.register( 'toggleListCheckbox', {
	  // Cannot be split or left by the caret.
	  isLimit: true,
	  allowIn: 'toggleList',
	  // Allow content which is allowed in blocks (i.e. text with attributes).
	  allowContentOf: '$block'
	} );

	// schema.register( 'toggleListTitleText', {
	//   // Cannot be split or left by the caret.
	//   isLimit: true,
	//   allowIn: 'toggleListTitle',
	//   // Allow content which is allowed in blocks (i.e. text with attributes).
	//   allowContentOf: '$block'
	// } );




	schema.register( 'toggleListContent', {
	  // Cannot be split or left by the caret.
	  isLimit: true,

	  allowIn: 'toggleList',

	  // Allow content which is allowed in the root (e.g. paragraphs).
	  allowContentOf: '$root'
	} );


	// schema.addChildCheck( ( context, childDefinition ) => {
	//   if ( context.endsWith( 'toggleListContent' ) && childDefinition.name == 'toggleList' ) {
	// 	return false;
	//   }
	// } );

  }

  _defineConverters() {
	const conversion = this.editor.conversion;


	// <toggleList> converters
	conversion.for( 'upcast' ).elementToElement( {
	  model: 'toggleList',
	  view: {
		name: 'div',
		classes: 'toggle-list'
	  }
	} );
	conversion.for( 'dataDowncast' ).elementToElement( {
	  model: 'toggleList',
	  view: {
		name: 'div',
		classes: 'toggle-list'
	  }
	} );
	conversion.for( 'editingDowncast' ).elementToElement( {
	  model: 'toggleList',
	  view: ( modelElement, { writer: viewWriter } ) => {
		const container = viewWriter.createContainerElement( 'div', { class: 'toggle-list' } );

		return toWidget( container, viewWriter, { label: 'toggle list widget' } );
	  }
	} );




	// <toggleListTitle> converters
	conversion.for( 'upcast' ).elementToElement( {
	  model: 'toggleListTitle',
	  view: {
		name: 'div',
		classes: 'toggle-list__title'
	  }
	} );
	conversion.for( 'dataDowncast' ).elementToElement( {
	  model: 'toggleListTitle',
	  view: {
		name: 'div',
		classes: 'toggle-list__title'
	  }
	} );
	conversion.for( 'editingDowncast' ).elementToElement( {
	  model: 'toggleListTitle',
	  view: ( modelElement, { writer: viewWriter } ) => {
		// Note: You use a more specialized createEditableElement() method here.
		const titleBlock = viewWriter.createEditableElement( 'div', { class: 'toggle-list__title' } );

		return toWidgetEditable( titleBlock, viewWriter );
	  }
	} );



	// <toggleListContent> converters
	conversion.for( 'upcast' ).elementToElement( {
	  model: 'toggleListContent',
	  view: {
		name: 'div',
		classes: 'toggle-list__content'
	  }
	} );
	conversion.for( 'dataDowncast' ).elementToElement( {
	  model: 'toggleListContent',
	  view: {
		name: 'div',
		classes: 'toggle-list__content'
	  }
	} );
	conversion.for( 'editingDowncast' ).elementToElement( {
	  model: 'toggleListContent',
	  view: ( modelElement, { writer: viewWriter } ) => {
		// Note: You use a more specialized createEditableElement() method here.
		const content = viewWriter.createEditableElement( 'div', { class: 'toggle-list__content' } );

		return toWidgetEditable( content, viewWriter );
	  }
	} );




	// conversion.elementToElement( {
	//   model: 'toggleListTitleCheckbox',
	//   view: {
	// 	name: 'h2',
	// 	classes: 'toggle-list__title-checkbox'
	//   }
	// } );
	// conversion.elementToElement( {
	//   model: 'toggleListTitleText',
	//   view: {
	// 	name: 'h1',
	// 	classes: 'toggle-list__title-text'
	//   }
	// } );






	// conversion.elementToElement( {
	//   model: 'toggleList',
	//   view: {
	// 	name: 'div',
	// 	classes: 'toggle-list'
	//   }
	// } );
	// conversion.elementToElement( {
	//   model: 'toggleListTitle',
	//   view: {
	// 	name: 'h1',
	// 	classes: 'toggle-list__title'
	//   }
	// } );
	conversion.elementToElement( {
	  model: 'toggleListCheckbox',
	  view: ( modelElement, { writer: viewWriter } ) => {
		// Note: You use a more specialized createEditableElement() method here.
		return viewWriter.createEditableElement( 'input', {
		  type: 'checkbox',
		  class: 'toggle-list__checkbox'
		} );




		// const titleBlock = viewWriter.createEditableElement( 'div', { class: 'toggle-list__title-checkbox' } );

		// return toWidgetEditable( titleBlock, viewWriter );
	  }
	  // view: {
		// name: 'input',
		// type: 'checkbox',
		// classes: 'toggle-list__title-checkbox'
	  // }
	} );
	// conversion.elementToElement( {
	//   model: 'toggleListTitleText',
	//   view: {
	// 	name: 'span',
	// 	classes: 'toggle-list__title-text'
	//   }
	// } );
  }

}
