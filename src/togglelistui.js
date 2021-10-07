import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { Plugin } from 'ckeditor5/src/core';

export default class ToggleListUi extends Plugin {
  init() {
	console.log( 'ToggleListUI#init() got called' );

	const editor = this.editor;
	const t = editor.t;


	// const view = this.editor.editing.view;
	// const viewDocument = view.document;
	//
	//
	// this.listenTo( viewDocument, 'toggleListTitleCheckbox', ( ...args ) => console.log(123123123123123) );



	editor.ui.componentFactory.add( 'toggleList', locale => {
	  // The state of the button will be bound to the widget command.
	  const command = editor.commands.get( 'insertToggleList' );

	  // The button will be an instance of ButtonView.
	  const buttonView = new ButtonView( locale );



	  buttonView.set( {
		// The t() function helps localize the editor. All strings enclosed in t() can be
		// translated and change when the language of the editor changes.
		label: t( 'Toggle list' ),
		withText: true,
		tooltip: true
	  } );

	  // Bind the state of the button to the command.
	  buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

	  // Execute the command when the button is clicked (executed).
	  this.listenTo( buttonView, 'execute', () => {
		// console.log(viewDocument)
	    editor.execute( 'insertToggleList' )
	  } );

	  return buttonView;
	} );
  }
}
