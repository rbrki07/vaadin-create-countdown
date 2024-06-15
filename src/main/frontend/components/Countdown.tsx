import { useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { HorizontalLayout, VerticalLayout } from "@vaadin/react-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const yearSeconds = 31536000;

const renderTime = (dimension: string, time: number) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

export default function Countdown({ endTime }: { endTime: number }) {
  const startTime = Date.now() / 1000;
  const remainingTime = endTime / 1000 - startTime;
  const windowSize = useWindowSize();

  const timerProps = useMemo(() => {
    const maxSize = 150;
    let calculatedSize = 0;
    const windowWidth = windowSize.width;
    if (windowWidth) {
      calculatedSize = Math.ceil(windowWidth / 4) - 5;
    }
    return {
      isPlaying: true,
      size: calculatedSize > maxSize ? maxSize : calculatedSize,
      strokeWidth: 8,
    };
  }, [windowSize]);

  return (
    <HorizontalLayout>
      <VerticalLayout className="mr-xs">
        <CountdownCircleTimer
          {...timerProps}
          colors="#3C81F2" // RGB: 60, 129, 242
          duration={yearSeconds}
          initialRemainingTime={remainingTime % yearSeconds}
        >
          {({ elapsedTime, color }) => (
            <span className="text-m text-center" style={{ color }}>
              {renderTime("days", getTimeDays(yearSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </VerticalLayout>
      <VerticalLayout className="mr-xs">
        <CountdownCircleTimer
          {...timerProps}
          colors="#5276F3" // RGB: 82, 118, 243
          duration={daySeconds}
          initialRemainingTime={remainingTime % daySeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <span className="text-m text-center" style={{ color }}>
              {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </VerticalLayout>
      <VerticalLayout className="mr-xs">
        <CountdownCircleTimer
          {...timerProps}
          colors="#676AF3" // RGB: 103, 106, 243
          duration={hourSeconds}
          initialRemainingTime={remainingTime % hourSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
          })}
        >
          {({ elapsedTime, color }) => (
            <span className="text-m text-center" style={{ color }}>
              {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </VerticalLayout>
      <VerticalLayout>
        <CountdownCircleTimer
          {...timerProps}
          colors="#7D5EF3" // RGB: 125, 94, 243
          duration={minuteSeconds}
          initialRemainingTime={remainingTime % minuteSeconds}
          onComplete={(totalElapsedTime) => ({
            shouldRepeat: remainingTime - totalElapsedTime > 0,
          })}
        >
          {({ elapsedTime, color }) => (
            <span className="text-m text-center" style={{ color }}>
              {renderTime("seconds", getTimeSeconds(elapsedTime))}
            </span>
          )}
        </CountdownCircleTimer>
      </VerticalLayout>
    </HorizontalLayout>
  );
}
