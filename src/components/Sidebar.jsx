import { NavLink  } from "react-router-dom";

const Sidebar = ({ type }) => {
    let links;

    switch (type) {
        case '1':
            links = (
                <>
                    <NavLink id="panel-navigator" className="farms" to="/farms">Farms</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/produces">Warehouse</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/stakeholders">Stakeholders</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/revenue">Dashboard</NavLink><br></br>
                </>
            );
            break;
        case '2':
            links = (
                <>
                    <NavLink id="panel-navigator" to="/farms">Farms</NavLink><br></br>
                    <NavLink id="panel-navigator" className="produces" to="/produces">Warehouse</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/stakeholders">Stakeholders</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/revenue">Dashboard</NavLink><br></br>
                </>
            );
            break;
        case '3':
            links = (
                <>
                    <NavLink id="panel-navigator" to="/farms">Farms</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/produces">Warehouse</NavLink><br></br>
                    <NavLink id="panel-navigator" className="stakeholders" to="/stakeholders">Stakeholders</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/revenue">Dashboard</NavLink><br></br>
                </>
            );
            break;
        case '4':
            links = (
                <>
                    <NavLink id="panel-navigator" to="/farms">Farms</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/produces">Warehouse</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/stakeholders">Stakeholders</NavLink><br></br>
                    <NavLink id="panel-navigator" className="revenue" to="/revenue">Dashboard</NavLink><br></br>
                </>
            );
            break;
        case '5':
            links = (
                <>
                    <NavLink id="panel-navigator" className="farms" to="/farms">Farms</NavLink><br></br>
                    <NavLink id="panel-navigator" className="produces" to="/produces">Warehouse</NavLink><br></br>
                    <NavLink id="panel-navigator" className="stakeholders" to="/stakeholders">Stakeholders</NavLink><br></br>
                    <NavLink id="panel-navigator" className="revenue" to="/revenue">Dashboard</NavLink><br></br>
                </>
            );
            break;
        default:
            links = (
                <>
                    <NavLink id="panel-navigator" to="/farms">Farms</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/produces">Warehouse</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/stakeholders">Stakeholders</NavLink><br></br>
                    <NavLink id="panel-navigator" to="/revenue">Dashboard</NavLink><br></br>
                </>
            );
    }

    return (
        
        <>
            <div className="outer-panel">
                <div className="inner-panel">
                    {links}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
