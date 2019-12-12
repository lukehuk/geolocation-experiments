type AppConfigurationObject = {
  publishKey: string;
  subscribeKey: string;
  googleMapsApiKey: string;
};

const isAppConfigured = (keyConfiguration: AppConfigurationObject) =>
  keyConfiguration.publishKey.length !== 0 &&
  keyConfiguration.subscribeKey.length !== 0 &&
  keyConfiguration.googleMapsApiKey.length !== 0;
export default isAppConfigured;
