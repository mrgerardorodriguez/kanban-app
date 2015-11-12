import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    // We're passing props to super by convention.
    // If you don't pass it, this.props won't get set!
    super(props);

    // We have to bind the context of `storeChanged`
    // explicitly so that `this` will point at the `App`
    // instance. You'll be seing this patter a lot.
    this.storeChanged = this.storeChanged.bind(this);
    this.state = NoteStore.getState();
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged(state) {
    // Without proper `bind`, `this` wouldn't
    // point at the right context (defaults to `window`
    // in browser environment)
    this.setState(state);
  }

  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button className='add-note' onClick={this.addNote}>Add Note</button>
        <Notes
          items={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote} />
      </div>
    );
  }

  addNote() {
    NoteActions.create({task: 'New task'});
  }

  editNote(id, task) {
    NoteActions.update({id, task});
  }

  deleteNote(id) {
    NoteActions.delete(id);
  }
}
