/**
 * Make certain components globally available in the Styleguide
 * without displaying in the sidebar
 */

// Common Libraries
import styled from 'styled-components';
global.styled = styled;

// Styleguide components
import Grid from './Grid';
import State from './State';
global.Grid = Grid;
global.State = State;

// Garden components
// import * as Button from '../../packages/button';
// import * as Chrome from '../../packages/chrome';
// import * as Form from '../../packages/form';
// import * as Selection from '../../packages/selection';
// import * as Theming from '../../packages/theming';

// global.Garden = {
//   Button,
//   Chrome,
//   Form,
//   Selection,
//   Theming
// };
