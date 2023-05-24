import checkIcon from '../../../assets/img/Job/JobHeader/Icon awesome-check@2x.png';
import progressBarBlue from '../../../assets/img/Job/JobHeader/Retângulo 181@2x.png';
import progressBarGray from '../../../assets/img/Job/JobHeader/Retângulo 947@2x.png';

interface ProgressBarProps {
    isComplete: boolean,
    children: React.ReactNode
}


function ProgressBar({ isComplete, children }: ProgressBarProps) {
    if (isComplete) {
        return (
            <div className="job__progress__container">
                <p>{children}</p>
                <div className="job__progress__bar__container">
                    <div className="progress__bar__circle complete">
                        <img src={checkIcon} />    
                    </div>
                    <img className="job__progress__bar__img" src={progressBarBlue} />
                </div> 
            </div>
        );
    }
    return (
        <div className="job__progress__container">
            <p>{children}</p>
            <div className="job__progress__bar__container">
                <div className="progress__bar__circle incomplete">
                </div>
                <img className="job__progress__bar__img" src={progressBarGray} />
            </div> 
        </div>
    );
}

export default ProgressBar;