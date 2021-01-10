import { css } from "styled-components";

export const NAV_WIDTH = "8rem";
export const CTA_FONT_FAMILY = '"Lucida Console","Courier New",monospace';
export const THEME_COLOR = '#fdba08';
export const TEXT_COLOR = '#0e2924'

const Sizes = {
    giant: 1170,
    desktop: 992,
    tablet: 768,
    phone: 376,
} as const;

type Initial = {
    [P in keyof typeof Sizes]: any;
};

// iterate through the sizes and create a media template
export const media = (Object.keys(Sizes) as (keyof typeof Sizes)[]).reduce(
    (acc, label) => {
        // use em in breakpoints to work properly cross-browser and support users
        // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
        const emSize = Sizes[label] / 16;
        return {
            ...acc,
            [label]: (...args: TemplateStringsArray) => css`
        @media (max-width: ${emSize}em) {
          ${css(args)};
        }
      `,
        };
    },
    {} as Initial
);
