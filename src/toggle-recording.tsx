import { getObs } from "./lib/obs";
import { appInstalled, appNotInstallAlertDialog, showWebsocketConnectionErrorToast } from "./lib/utils";
import { showHUD } from "@raycast/api";

import OBSWebSocket from "obs-websocket-js";

export default async function main() {
  if (!(await appInstalled())) {
    return await appNotInstallAlertDialog();
  }

  let obs: OBSWebSocket;
  try {
    obs = await getObs();
  } catch {
    return await showWebsocketConnectionErrorToast();
  }

  const { outputActive } = await obs.call("ToggleRecord");

  if (outputActive) {
    showHUD("Recording");
  } else {
    showHUD("Recording stopped");
  }
}
