import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';
import { PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType( metadata.name, {
	edit: ({ attributes, context, setAttributes }) => {
		const blockProps = useBlockProps( { className: 'hm-table-of-contents' } );
		return (
			<div { ...blockProps }>
				<InspectorControls>
					<PanelBody>
						<ToggleControl
							label={ __( 'Show Heading', 'hm-table-of-contents' ) }
							checked={ !!attributes.showHeading }
							onChange={ (showHeading) => setAttributes({ showHeading }) }
						/>
						<TextControl
							label={ __( 'Heading', 'hm-table-of-contents' ) }
							value={ attributes.heading }
							onChange={ (heading) => setAttributes({ heading }) }
						/>
						<SelectControl
							label={ __( 'Maximum Header Depth', 'hm-table-of-contents' ) }
							value={ attributes.maxLevel || 3 }
							options={ [
								{ label: '1', value: 1 },
								{ label: '2', value: 2 },
								{ label: '3', value: 3 },
								{ label: '4', value: 4 },
							] }
							onChange={ (maxLevel) => setAttributes({ maxLevel }) }
						/>
					</PanelBody>
				</InspectorControls>
				<ServerSideRender
					block={ metadata.name }
					attributes={ {
						postId: context.postId,
						...attributes
					} }
				/>
			</div>
		);
	},
});
