<code class="u-display-block u-fg-grey-600 u-font-family-monospace u-fs-md u-mb-sm">
  import { defaultTheme } from '@zendeskgarden/react-theming'
</code>

The default theme object provides common variables used to visually style
Garden components. Use it to consistently style your own components or
application in conjunction with Garden. One of the easiest ways to customize
Garden is to modify some or all of the variables in the `theme` object passed
as a prop to the `ThemeProvider`. Whatever `theme` you provide will be merged
with the `defaultTheme` and used to style components nested under the
`ThemeProvider`. Several key top-level theming objects are described below.

### Border Radii

Both the `sm` and `md` values are used to determine the "roundness" of
various components. For example, the following `theme` update would
render buttons with square corners:

```jsx static
const theme = {
  borderRadii: {
    md: 0
  }
};

<ThemeProvider theme={theme}>
  <Button>I'm a Square!</Button>
</ThemeProvider>;
```

### Colors

These are the main colors used throughout the system. The `base` is used to
determine whether to render components in `light` or `dark` mode (Garden
currently only supports `light` mode). The `background` and `foreground`
colors are used to determine basic text-on-surface colors. Most component
coloring is applied via the definition of various hues (see
[Palette](#palette) for more details). Each hue variable may receive either a
palette hue name or object (i.e. keyed by numbers 100..800).

- `primaryHue`: used to provide primary accent colors. Defaults to `blue`.
- `dangerHue`: used to represent danger or error states. Defaults to `red`.
- `warningHue`: used to represent caution or warning states. Defaults to `yellow`.
- `successHue`: used to represent success states. Defaults to `green`.
- `neutralHue`: used to provide neutral or disabled colors. Defaults to `grey`.

This simplified approach allows components to apply necessary alpha and state
(i.e. hover, active, focused) styling based on various shades throughout the
hue. In cases where a hue may contain limited shading, we'll use color
utilities to fill-in missing shade values required by a component. Note that
hues available to you are virtually unlimited – see the **Palette** theming
object below for more details. You provide the hue; Garden does the rest. See
the **Components** theming object description below for cases where you
require deeper color control.

### Components

The `components` object (empty by default) is for individual component
styling. Within this object, keys are `COMPONENT_ID`s (see table below).
Values are template strings of CSS to be applied to the component. You may
find that a `css` helper from a library like
[styled-components](https://www.styled-components.com/docs/api#css) may be
helpful in cases where you need advanced composition or access to component
`props`. The following example code illustrates potential component styling
overrides.

```jsx static
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Notification, Title, Paragraph } from '@zendeskgarden/react-notifications';
import { css } from 'styled-components';

const theme = {
  components: {
    'notifications.title': `
      &&{
        color: red;

        :hover {
          color: blue;
        }
      }
    `,
    'notifications.paragraph': css`
      color: ${props => props.purple && 'purple'};
    `
  }
};

<ThemeProvider theme={theme}>
  <Notification>
    <Title>Themed Title (hover as well)</Title>
    <Paragraph purple>Custom theme triggered by prop</Paragraph>
  </Notification>
</ThemeProvider>;
```

```jsx noeditor
<CIDTable>See https://zendeskgarden.github.io/react-components/theming</CIDTable>
```

### Fonts

The `fonts` section of the theme contains two CSS `font-family` stacks:

- `mono`: monospace font stack
- `system`: system font stack used throughout Zendesk products

### Font sizes and line heights

The `fontSizes` and `lineHeights` objects work together to define the basis
for Garden's
[typography](https://garden.zendesk.com/react-components/typography/) system.
Note that `fontSizes` contains a `mono` child object with definitions for
monospace font sizing – slightly reduced so monospace x-height is
proportional with the surrounding system font.

### Palette

Unlike many theming systems that expose color hex values for nearly every
possible component variant (hover, active, focus, etc.), Garden takes what we
think is a more pragmatic approach. We give you access to modify and extend
our full color palette. Using online generators such as [Material's color
tool](https://material.io/tools/color/), you have the ability to amplify the
default theme with your own accessible palette of color hues and shades. Used
in conjuction with the **Colors** values described above, you have the power
of setting custom `primary`, `neutral`, etc. hues that will be applied
throughout the component system.

Conceptually, this means you could override Garden's `blue` hue to be a
completely non-blue set of shades or provide random shade ordering that doesn't
fall in line with Garden's 100 (extra light) through 800 (extra dark) structure.
We would discourage you from mutating the palette in this manner as it
weakens semantics and reduces the likelihood of successful component color
styling. When you find yourself using `palette` theming to surgically tweak
component colors (i.e. "I want to change the background color on button
hover"), consider using **Components** theming described above.

The following snippet shows how Garden's palette can be modified and extended
with colors from Material-UI.

```jsx static
import { ThemeProvider } from '@zendeskgarden/react-theming';
import { Button } from '@zendeskgarden/react-buttons';
import { colors } from '@material-ui/core';

const theme = {
  colors: {
    dangerHue: 'deepOrange'
  },
  palette: {
    blue: colors.blue,
    deepOrange: colors.deepOrange
  }
};

<ThemeProvider theme={theme}>
  <>
    <Button>Using material blue</Button>
    <Button danger>Using material deep orange</Button>
  </>
</ThemeProvider>;
```

### Shadows

The `shadows` portion of the default theme contains three functions:

- `sm` and `md`: each take an RGBA `color` parameter and are typically used
  to apply Garden's `:focus` box shadow. Values under the `shadowWidths` theme
  object are used to determine shadow thickness.
- `lg`: takes `offsetY` and `blurRadius` parameters for applying a faint
  kale-colored drop shadow to components that appear to float above the surface
  (i.e. modals, notifications, etc.).

### Space

The final frontier of Garden's theming system, `space.base` is the essential
factor used to compute our base-4 component system. This value gives you
sweeping control over component padding and margins. Pixel sizes `xxs`
through `xxl` are added for convenience. Remember, to update other theming
values (i.e. `borderRadii` & `lineHeights`) to correspond with your `base` of choice.

### `defaultTheme` object

The following reference displays Garden's `defaultTheme` in its entirety.

```jsx noeditor
const { Well } = require('@zendeskgarden/react-notifications/src');
const { defaultTheme } = require('@zendeskgarden/react-theming/src');

const StyledTheme = styled.pre`
  margin: 0;
  padding: 0;
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.mono.sm};
  overflow: hidden;
`;

const replacer = (key, value) => {
  let retVal = value;

  if (typeof value === 'function') {
    const fn = value.toString();
    const start = fn.indexOf('(');
    const end = fn.indexOf('\n') - 2;

    retVal = `${fn.substring(start, end)} => expression`;
  }

  return retVal;
};

<Well recessed>
  <StyledTheme>{JSON.stringify(defaultTheme, replacer, '  ')}</StyledTheme>
</Well>;
```