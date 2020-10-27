import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const CustomTable = withStyles(theme => ({
    root: {
        
    }
}))(Table);

export const CustomTableHead = withStyles(theme => ({
    root: {
        
    }
}))(TableHead);

export const CustomTableBody = withStyles(theme => ({
    root: {
        
    }
}))(TableBody);

export const CustomTableCell = withStyles(theme => ({
    root: {
        
    },
    head: {
        color:theme.palette.secondary.main,
        textTransform:'uppercase',
        fontWeight:600
    },
    body: {
        color:theme.palette.text.defaultSub
    }
}))(TableCell);

export const CustomTableContainer = withStyles(theme => ({
    root: {
        
    }
}))(TableContainer);

export const CustomTableRow = withStyles(theme => ({
    root: {
        
    }
}))(TableRow);