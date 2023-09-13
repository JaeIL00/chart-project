import { MouseEvent } from "react";
import { IoMdRefresh } from "react-icons/io";

import "../../styles/chartFilterStyle.scss";

interface Props {
    filterTextList: string[];
    chooseFilter: string[];
    clickFilterBtn: (event: MouseEvent<HTMLButtonElement>) => void;
    resetFilter: () => void;
}

const ChartFilter = ({
    filterTextList,
    chooseFilter,
    clickFilterBtn,
    resetFilter,
}: Props) => {
    return (
        <section className="filter-container">
            <div className="title-box">
                <h5 className="filter-title">차트 필터</h5>
                <span className="sub-describe">중복 선택</span>
            </div>
            <ul className="filter-btn-list">
                {filterTextList.map((text) => {
                    const isActive = chooseFilter.includes(text);
                    return (
                        <li key={text}>
                            <button
                                className={
                                    "filter-btn" + (isActive ? " active" : "")
                                }
                                onClick={clickFilterBtn}
                            >
                                {text}
                            </button>
                        </li>
                    );
                })}
                <li>
                    <button className="chart-refresh-btn" onClick={resetFilter}>
                        <IoMdRefresh size="18" color="#efefef" />
                    </button>
                </li>
            </ul>
        </section>
    );
};

export default ChartFilter;
