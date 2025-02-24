import React, { Component } from "react";
import "../stylesheets/Headquarters.css";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

class Headquarters extends Component {
  state = {
    activatedAll: false,
    logEvents: []
  };

  addLog = e => {
    return this.setState(prevState => ({
      logEvents: [e, ...prevState.logEvents]
    }));
  };

  handleActivate = () => {
    this.setState(
      prevState => ({ activatedAll: !prevState.activatedAll }),
      () => this.props.activateAllHosts(this.state.activatedAll)
    );
  };

  selectedHost = () => {
    return this.props.hosts.find(host => host.id === this.props.selectedHostId);
  };

  renderDecomissionedHosts = () => {
    return this.props.hosts.filter(host => !host.active);
  };

  render() {
    //prettier-ignore
    const { areas, hosts, selectedHostId, selectAHost, activateAHost, setArea } = this.props;
    return (
      <Grid celled="internally">
        <Grid.Column width={8}>
          {
            <ColdStorage
              hosts={this.renderDecomissionedHosts()}
              // for testing, to show all hosts
              // hosts={this.props.hosts}
              selectAHost={selectAHost}
              selectedHostId={selectedHostId}
            />
          }
        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            hosts={hosts}
            areas={areas}
            activateAHost={activateAHost}
            setArea={setArea}
            selectedHost={this.selectedHost()}
            addLog={this.addLog}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel
            hosts={hosts}
            logEvents={this.state.logEvents}
            activatedAll={this.state.activatedAll}
            handleActivate={this.handleActivate}
            addLog={this.addLog}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Headquarters;
