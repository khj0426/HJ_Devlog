import type { Meta, StoryObj } from '@storybook/react'

import Typography from './Typography'

const meta: Meta<typeof Typography> = {
    title: 'Component/Typography',
    component: Typography,
    parameters: {
        layout: 'fullscreen',
        componentSubTitle: '기본적인 텍스트를 표시하는 컴포넌트',
    },
    tags: ['autodocs'],
    args: {
        children: 'TextText',
    },
}
export default meta
type Story = StoryObj<typeof Typography>

export const BaseTypography: Story = {
    args: {},
}

export const Heading1: Story = {
    args: {
        tag: 'h1',
        children: 'Heading 1',
        fontSize: '2em',
        fontWeight: 'bold',
    },
}

export const Heading2: Story = {
    args: {
        tag: 'h2',
        children: 'Heading 2',
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
}

export const Paragraph: Story = {
    args: {
        tag: 'p',
        children: 'This is a paragraph with some example text.',
        fontSize: '1em',
        color: 'gray',
    },
}

export const SpanText: Story = {
    args: {
        tag: 'span',
        children: 'This is a span text.',
        fontSize: '1em',
        color: 'blue',
    },
}

export const NoWrapText: Story = {
    args: {
        tag: 'p',
        children:
            'This text will not wrap and will be truncated if it is too long.',
        noWrap: true,
        maxWidth: '100px',
        fontSize: '1em',
    },
}

export const CustomStyledText: Story = {
    args: {
        tag: 'h3',
        children: 'Custom Styled Heading',
        color: 'purple',
        fontSize: '1.5em',
        fontWeight: '600',
        margin: '20px 0',
    },
}

export const AlignedText: Story = {
    args: {
        tag: 'p',
        children: 'This text is center-aligned.',
        textAlign: 'center',
        fontSize: '1em',
    },
}

export const LargeText: Story = {
    args: {
        tag: 'h4',
        children: 'Large Heading Example',
        fontSize: '2.5em',
        fontWeight: 'bold',
        color: 'darkgreen',
    },
}
