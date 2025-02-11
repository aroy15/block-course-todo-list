import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { Button, CheckboxControl, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import metadata from './block.json';
import './editor.scss';

export default function Edit() {
	const [ newTodo, setNewTodo ] = useState();
	const [ addingTodo, setAddingTodo ] = useState( false );
	const todos = useSelect( ( select ) => {
		const todosStore = select( 'blocks-course-plugin/todos' );
		return todosStore && todosStore.getTodos();
	} );

	const actions = useDispatch( 'blocks-course-plugin/todos' );

	const addTodo = actions && actions.addTodo;
	const toggleTodo = actions && actions.toggleTodo;

	const onSubmitTodo = async ( e ) => {
		e.preventDefault();
		if ( addTodo && newTodo ) {
			setAddingTodo( true );
			await addTodo( newTodo );
			setNewTodo( '' );
			setAddingTodo( false );
		}
	};

	return (
		<div { ...useBlockProps() }>
			{ ! todos && (
				<p style={ { color: 'red' } }>
					{ __(
						'Please make sure the store registered plugin is activated',
						metadata.textdomain
					) }
				</p>
			) }
			{ todos && (
				<>
					<ul>
						{ todos.map( ( todo, index ) => (
							<li
								key={ todo.id }
								className={
									todo.completed ? 'todo-completed' : ''
								}
							>
								<CheckboxControl
									__nextHasNoMarginBottom
									disabled={ todo.loading }
									label={ todo.title }
									checked={ todo.completed }
									onChange={ () => {
										if ( toggleTodo ) {
											toggleTodo( todo, index );
										}
									} }
								/>
							</li>
						) ) }
					</ul>
					<form onSubmit={ onSubmitTodo } className="add-todo-form">
						<TextControl
							__nextHasNoMarginBottom
							value={ newTodo }
							onChange={ ( value ) => setNewTodo( value ) }
						/>
						<Button
							disabled={ addingTodo }
							type="submit"
							variant="primary"
						>
							{ __( 'Add Todo', metadata.textdomain ) }
						</Button>
					</form>
				</>
			) }
		</div>
	);
}
