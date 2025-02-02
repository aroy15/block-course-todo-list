import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import { CheckboxControl } from '@wordpress/components';
import metadata from './block.json';
import './editor.scss';

export default function Edit() {
	const todos = useSelect( ( select ) => {
		const todosStore = select( 'blocks-course-plugin/todos' );
		return todosStore && todosStore.getTodos();
	} );

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
				<ul>
					{ todos.map( ( todo ) => (
						<li
							key={ todo.id }
							className={ todo.completed ? 'todo-completed' : '' }
						>
							<CheckboxControl
								label={ todo.title }
								checked={ todo.completed }
								onChange={ () => {} }
							/>
						</li>
					) ) }
				</ul>
			) }
		</div>
	);
}
