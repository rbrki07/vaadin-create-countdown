import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { HorizontalLayout, VerticalLayout } from '@vaadin/react-components';

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/info-circle-solid.svg' },
  title: 'About',
};

export default function AboutView() {
  return (
    <VerticalLayout className="min-h-full p-s justify-center items-center">
      <HorizontalLayout className="w-full justify-center items-center" theme="margin">
        <h1 className="text-xl text-center">
          This is a simple demo app build with{' '}
          <a href="https://vaadin.com/hilla" target="_blank" rel="noreferrer">
            Hilla
          </a>
          .
        </h1>
      </HorizontalLayout>
      <HorizontalLayout className="w-full justify-center items-center">
        <img className="max-w-full" src="images/hilla-logo.png" alt="Hilla Logo" />
      </HorizontalLayout>
      <HorizontalLayout className="w-full justify-center items-center" theme="margin">
        <h3 className="text-l text-center">
          Credits: Countdown components made with{' '}
          <a href="https://www.npmjs.com/package/react-countdown-circle-timer" target="_blank" rel="noreferrer">
            react-countdown-circle-timer
          </a>{' '}
          and{' '}
          <a href="https://www.npmjs.com/package/@uidotdev/usehooks" target="_blank" rel="noreferrer">
            @uidotdev/usehooks
          </a>
          .
        </h3>
      </HorizontalLayout>
      <HorizontalLayout className="w-full justify-center items-center" theme="margin">
        <h3 className="text-l text-center">
          Code:{' '}
          <a href="https://github.com/rbrki07/vaadin-create-countdown" target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </h3>
      </HorizontalLayout>
      <HorizontalLayout className="w-full justify-center items-center" theme="margin">
        <h3 className="text-l text-center">
          To find out more about Vaadin Create, please visit{' '}
          <a href="https://vaadin.com/vaadin-create" target="_blank" rel="noreferrer">
            https://vaadin.com/vaadin-create
          </a>
          .
        </h3>
      </HorizontalLayout>
    </VerticalLayout>
  );
}
