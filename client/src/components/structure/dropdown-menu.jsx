import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BudgetSummary from "../pages/user-panel/budget-summary";

const DropdownMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [choosenOption, setChoosenOption] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);
        setChoosenOption(option);
    };

    return (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            endIcon={anchorEl ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          >
            {choosenOption ? choosenOption : 'Wybierz budżet'}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose(null)}
          >
            <MenuItem onClick={() => handleClose('Budżet 1')}>Budżet 1</MenuItem>
            <MenuItem onClick={() => handleClose('Budżet 2')}>Budżet 2</MenuItem>
            <MenuItem onClick={() => handleClose('Budżet 3')}>Budżet 3</MenuItem>
          </Menu>
          {choosenOption === 'Budżet 1' && <BudgetSummary />}
          {choosenOption === 'Budżet 2' && <BudgetSummary />}
        </div>
      );
      
}

export default DropdownMenu;