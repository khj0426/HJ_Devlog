import {
    ComponentPropsWithRef,
    ReactNode,
    CSSProperties,
    forwardRef,
    ForwardedRef,
} from 'react'

import { css, styled } from 'styled-components'
type TagVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

type TypographyProps = ComponentPropsWithRef<'h2'> & {
    tag?: TagVariants
    children: ReactNode
    textAlign?: CSSProperties['textAlign']
    color?: CSSProperties['color']
    margin?: CSSProperties['margin']
    padding?: CSSProperties['padding']
    noWrap?: boolean
    fontSize?: CSSProperties['fontSize']
    fontWeight?: CSSProperties['fontWeight']
    maxWidth?: CSSProperties['width']
}
const StyledTypography = styled.p<TypographyProps>`
    margin: ${({ margin }) => margin};
    padding: ${({ padding }) => padding};
    color: ${({ color }) => color ?? 'inherit'};
    text-align: ${({ textAlign }) => textAlign ?? 'left'};
    font-size: ${({ fontSize }) => fontSize ?? 'inherit'};
    max-width: ${({ maxWidth }) => maxWidth ?? 'none'};
    font-weight: ${({ fontWeight }) => fontWeight ?? 'normal'};

    ${({ noWrap, maxWidth }) =>
        noWrap &&
        css`
            width: ${maxWidth};
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        `}
`

const Typography = forwardRef(
    (
        {
            tag = 'p',
            color = 'inherit',
            margin,
            padding,
            noWrap = false,
            fontSize = 'inherit',
            fontWeight,
            maxWidth,
            children,
            ...rest
        }: TypographyProps,
        ref: ForwardedRef<HTMLHeadingElement>
    ) => {
        return (
            <StyledTypography
                as={tag}
                color={color}
                margin={margin}
                padding={padding}
                noWrap={noWrap}
                fontSize={fontSize}
                fontWeight={fontWeight}
                maxWidth={maxWidth}
                ref={ref}
                {...rest}
            >
                {children}
            </StyledTypography>
        )
    }
)

Typography.displayName = 'Typography'

export default Typography
