import {Experiment} from './Experiment';
import {RemoteConfigurationSource} from './RemoteConfigurationSource';

export class RemoteConfig {
    payload: Map<string, Object>;
    experiment?: Experiment | null;
    source: RemoteConfigurationSource;

    constructor(payload: Map<string, Object>, experiment: Experiment | null, source: RemoteConfigurationSource) {
        this.payload = payload;
        this.experiment = experiment;
        this.source = source;
    }
}
