import { Link } from "react-router-dom";
import home from './utils/home.png'
import cards from './utils/poker-cards.png'
import crown from './utils/crown.png'
import star from './utils/star.png'
import graduation from './utils/graduation.png'

export default function Header() {
    return (
        <header>
                <div className="header-content">
                    <Link to="/">
                        <div className="logo">
                            <img src={crown} className="logoIcon" />
                            <div className="logoName">GTO KING</div>
                        </div>
                    </Link>
                    <nav aria-label="main navigation">
                        <div className="menu">
                            <div className="menuBtn">
                                <span>Services</span>
                                <img src={star} className="menuIcon" />
                            </div>
                            <div className="dropdownGrid">
                                <Link to="/">
                                    <button>
                                        <img src={home} className="menuIcon" />
                                        HOME
                                        <p>Return to homepage</p>
                                    </button>
                                </Link>
                                <Link to="/training">
                                    <button>
                                        <img src={graduation} className="menuIcon" />
                                        TRAINING
                                        <p>Play vs CPU enemy</p>
                                    </button>
                                </Link>
                                <Link to="/range-builder">
                                    <button>
                                        <img src={cards} className="menuIcon" />
                                        RANGE BUILDER
                                        <p>Build you own custom range</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
    )
}