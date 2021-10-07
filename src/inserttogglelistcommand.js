import Command from '@ckeditor/ckeditor5-core/src/command'

export default class InsertToggleListCommand extends Command {
  execute() {
	this.editor.model.change( writer => {
	  // Insert <simpleBox>*</simpleBox> at the current selection position
	  // in a way that will result in creating a valid model structure.
	  this.editor.model.insertContent( createToggleList( writer ) );
	} );
  }

  refresh() {
	const model = this.editor.model;
	const selection = model.document.selection;
	const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'toggleList' );

	this.isEnabled = allowedIn !== null;
  }
}

function createToggleList( writer ) {
  const toggleList = writer.createElement( 'toggleList' );
  const toggleListTitle = writer.createElement( 'toggleListTitle' );
  const toggleListTitleCheckbox = writer.createElement( 'toggleListCheckbox' );
  // const toggleListTitleText = writer.createElement( 'toggleListTitleText' );
  const toggleListContent = writer.createElement( 'toggleListContent' );

  // writer.append( toggleListTitleCheckbox, toggleListTitle );
  writer.append( toggleListTitleCheckbox, toggleList );
  // writer.append( toggleListTitleText, toggleListTitle );
  writer.append( toggleListTitle, toggleList );
  writer.append( toggleListContent, toggleList );

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.
  writer.appendElement( 'paragraph', toggleListContent );

  return toggleList;
}
