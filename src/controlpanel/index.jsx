import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Accordion, AccordionDetails, AccordionSummary, MenuItem, Select, TextField } from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture';

import { setAquariumSize, setInitAquariumSize } from '../redux/features/aquariumConfigSlice';

import { AppBar, Drawer, DrawerHeader } from '../utils/functions';
import { aquaSizeValArr, sandTypeArr } from '../utils/constants';
import './styles.css';

const ControlPanel = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [aquariumSizeVal, setAquariumSizeVal] = useState({
        width: 5,
        length: 4,
        height: 3,
        thickness: 1,
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        console.log({name, value});
        const numValue = Number(value);
        setAquariumSizeVal(prev => ({...prev, [name]: numValue}))
        dispatch(setAquariumSize)
    }

    useEffect(() => {
        dispatch(setInitAquariumSize(aquariumSizeVal))
    }, [aquariumSizeVal])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[ { marginRight: 5 }, open && { display: 'none' } ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Aquarium Software
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {open &&
                    <div className='ui-option-panel'>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="size-options-content" id="size-options-header" >
                                <Typography>Dimension</Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <div className='size-section'>
                                    <div className='size-section-sub-title'>Width</div>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2, width: '125px', height: '35px' }}
                                        value={aquariumSizeVal.width}
                                        name='width'
                                        onChange={handleDimensionChange} 
                                    >
                                        {aquaSizeValArr.width.map((val, index) => <MenuItem key={`width-${index}`} value={val}>{val}</MenuItem>)}
                                    </Select>
                                </div>
                                <div className='size-section'>
                                    <div className='size-section-sub-title'>Length</div>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2, width: '125px', height: '35px' }}
                                        value={aquariumSizeVal.length}
                                        name='length'
                                        onChange={handleDimensionChange} 
                                    >
                                        {aquaSizeValArr.length.map((val, index) => <MenuItem key={`length-${index}`} value={val}>{val}</MenuItem>)}
                                    </Select>
                                </div>
                                <div className='size-section'>
                                    <div className='size-section-sub-title'>Height</div>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2, width: '125px', height: '35px' }}
                                        value={aquariumSizeVal.height}
                                        name='height'
                                        onChange={handleDimensionChange} 
                                    >
                                        {aquaSizeValArr.height.map((val, index) => <MenuItem key={`height-${index}`} value={val}>{val}</MenuItem>)}
                                    </Select>
                                </div>
                                <div className='size-section'>
                                    <div className='size-section-sub-title'>Thickness</div>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2, width: '125px', height: '35px' }}
                                        value={aquariumSizeVal.thickness}
                                        name='thickness'
                                        onChange={handleDimensionChange} 
                                    >
                                        {aquaSizeValArr.thickness.map((val, index) => <MenuItem key={`thickness-${index}`} value={val}>{val}</MenuItem>)}
                                    </Select>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="color-pickers-content" id="color-pickers-header" >
                                <Typography>Light Color</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='color-section'>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="color"
                                    label="ambient light"
                                    sx={{ mb: 2, height: '32px', '& input': { height: '32px' } }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="color"
                                    label="sport light"
                                    sx={{ mb: 5, height: '32px', '& input': { height: '32px' } }}
                                />
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="color-pickers-content" id="color-pickers-header" >
                                <Typography>Sand</Typography>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails className='sand-section'>
                                <div className='size-section'>
                                    <div className='size-section-sub-title'>type</div>
                                    <Select
                                        fullWidth
                                        variant="outlined"
                                        sx={{ mb: 2, width: '125px', height: '35px' }}
                                        defaultValue=""
                                    >
                                        {sandTypeArr.map((val, index) => <MenuItem key={`sand-type-${index}`} value={val}>{val}</MenuItem>)}
                                    </Select>
                                </div>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="color"
                                    label="color"
                                    sx={{ mb: 5, height: '32px', '& input': { height: '32px' } }}
                                />
                            </AccordionDetails>
                        </Accordion>
                    </div>
                }
                <Divider />
                <List>
                    {['size', 'light', 'color'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton sx={[ { minHeight: 48, px: 2.5 }, open ? { display: 'none'} : { justifyContent: 'center'} ]}>
                                <ListItemIcon sx={[ { minWidth: 0, justifyContent: 'center' } ]}>
                                    {text === 'size' && <PictureInPictureIcon />}
                                    {text === 'light' && <WbIncandescentIcon />}
                                    {text === 'color' && <ColorLensIcon />}
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box style={{position: 'absolute'}} component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
            </Box>
        </Box>
    );
}

export default ControlPanel;