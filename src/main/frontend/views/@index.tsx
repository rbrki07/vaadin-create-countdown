import { useEffect } from "react";

import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { HorizontalLayout, VerticalLayout } from "@vaadin/react-components";
import { useSignal } from "@vaadin/hilla-react-signals";

import Countdown from "Frontend/components/Countdown";
import { CountdownService } from "Frontend/generated/endpoints";

export const config: ViewConfig = {
  menu: { order: 0, icon: "line-awesome/svg/stopwatch-solid.svg" },
  title: "Countdown",
};

export default function CountdownView() {
  const endTime = useSignal<number | null>(null);
  useEffect(() => {
    CountdownService.getEndTime().then((time) => (endTime.value = Date.parse(time)));
  }, [endTime]);

  return (
    <VerticalLayout className="min-h-full p-s justify-center items-center reindeer-background">
      <HorizontalLayout className="w-full max-w-screen-sm justify-center items-center">
        <img width="100%" height="100%" src="images/vaadin-create-logo.svg" alt="Vaadin Create Logo" />
      </HorizontalLayout>
      <HorizontalLayout>
        <h1 className="text-xl m-l">will take place in</h1>
      </HorizontalLayout>
      {endTime.value && (
        <HorizontalLayout className="w-full justify-center items-center">
          <Countdown endTime={endTime.value} />
        </HorizontalLayout>
      )}
    </VerticalLayout>
  );
}
