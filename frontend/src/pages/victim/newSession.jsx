import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';

import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';


import withRoot from '../../withRoot';

import Layout from '../../components/Layout/index';




const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
    paper: {
        margin: theme.spacing.unit * 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
            .spacing.unit * 3}px`,
    },
    input: {
        margin: theme.spacing.unit,
    },
});


class NewSession extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };


    constructor(props) {
        super(props)
        this.axios = this.props.axios

    }

    handleSelectChange = event => {
        const formValues = this.state.formValues
        formValues[event.target.name] = event.target.value
        this.setState({formValues});
        console.log(this.state)
    };
    handleChange = event => {
        const formValues = this.state.formValues
        formValues[event.target.id] = event.target.value
        this.setState({formValues});
        console.log(this.state)
    };
    handleNumChange = evt => {
            const keyCode = evt.keyCode || evt.which;
            const keyValue = String.fromCharCode(keyCode);
            if (/[+\-\e]/.test(keyValue))
                evt.preventDefault();
    };

    checkboxChange = field => {
        const formValues = this.state.formValues
        formValues[field] = (formValues[field] === 0 || formValues[field] === "") ? 1 : 0;
        this.setState({formValues});
        console.log(this.state)
    };
    radioChange = (field, value) => {
        const formValues = this.state.formValues
        formValues[field] = value
        this.setState({formValues});
        console.log(this.state)
    };


    createSession() {
        this.axios.post("create_session.php", this.state.formValues)

    }
    static getDate(){
        var local = new Date();
        return local.toJSON().slice(0,10);
    }

    state = {
        formValues: {
            incident_id: this.props.incidentID,
            kuupaev: NewSession.getDate(),
            kirjeldus: "",
            sidevahendid: "",
            kriisinoustamine: 0,
            kriisinoustamise_aeg: "",
            juhutuminoustamine: 0,
            vorgustikutoo: 0,
            psuhhonoustamine: 0,
            juuranoustamine: 0,
            tegevused_lapsega: 0,
            tugiteenused: 0,
            naise_majutus: 0,
            laste_arv: 0,
            laste_majutus: 0,
            umarlaud: 0,
            marac: 0,
            perearst_kaasatud: 0,
            emo_kaasatud: 0,
            naistearst_kaasatud: 0,
            politsei_kaasatud: 0,
            prokuratuur_kaasatud: "",
            ohvriabi_kaasatud: "",
            lastekaitse_kaasatud: "",
            kov_kaasatud: 0,
            tsiviilkohus_kaasatud: 0,
            kriminaalkohus_kaasatud: 0,
            haridusasutus_kaasatud: "",
            mtu_kaasatud: "",
            tuttavad_kaasatud: "",
            markused: ""
        },
    };

    render() {
        const {classes} = this.props;
        return <Layout title="Uus juhtum">
            <Typography variant="h4" gutterBottom>
                Lisa uus sessioon
            </Typography>
            <Paper className={classes.paper}>
                <form className={classes.form}>
                    <FormControl margin="normal">
                        <TextField
                            value = {this.state.formValues.kuupaev}
                            id="kuupaev"
                            label="Kuupäev"
                            type="date"
                            onChange={this.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="kirjeldus">Kirjeldus</InputLabel>
                        <Input
                            value={this.state.formValues.kirjeldus}
                            onChange={this.handleChange}
                            id = "kirjeldus"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Kas nõustamine toimus sidevahendite abil?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.sidevahendid === 1}
                                    onClick={() => this.radioChange("sidevahendid", 1)}/>
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.sidevahendid === 0}
                                    onClick={() => this.radioChange("sidevahendid", 0)}/>
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth >
                        <FormLabel>Osutatud teenused (tundide arv)</FormLabel>
                    </FormControl>

                    <FormControl margin="normal" >
                        <InputLabel htmlFor="kriisinoustamine">Kriisinõustamine</InputLabel>
                        <Input
                            type= "number"
                            step="0.01"
                            value={this.state.formValues.kriisinoustamine}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "kriisinoustamine"
                        >
                        </Input>
                    </FormControl>
                    {parseInt(this.state.formValues.kriisinoustamine) > 0 ?
                        <FormControl margin="normal">
                            <Select
                                value={this.state.formValues.kriisinoustamise_aeg}
                                onChange={this.handleSelectChange}
                                inputProps={{
                                    name: 'kriisinoustamise_aeg',
                                    id: 'kriisinoustamise_aeg',
                                }}>
                                <MenuItem value={"08:00-22:00"}>08:00-22:00</MenuItem>
                                <MenuItem value={"22:00-08:00"}>22:00-08:00</MenuItem>

                                <MenuItem value={"teadmata"}>Teadmata</MenuItem>
                            </Select>
                        </FormControl> : null}
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="juhutuminoustamine">Juhtumipõhine nõustamine</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={this.state.formValues.juhutuminoustamine}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "juhutuminoustamine"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="vorgustikutoo">Võrgustikutöö</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.vorgustikutoo}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "vorgustikutoo"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="psuhhonoustamine">Psühholoogiline nõustamine, psühhoteraapia</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.psuhhonoustamine}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "psuhhonoustamine"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="juuranoustamine">Juriidiline nõustamine</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.juuranoustamine}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "juuranoustamine"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="tegevused_lapsega">Tegevused lapsega</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.tegevused_lapsega}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "tegevused_lapsega"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="tugiteenused">Tugiteenused</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.tugiteenused}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "tugiteenused"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="naise_majutus">Naise majutuspäevade arv</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.naise_majutus}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "naise_majutus"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="laste_arv">Kaasasolevate laste arv</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.laste_arv}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "laste_arv"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="laste_majutus">Laste majutuspäevade arv</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.laste_majutus}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "laste_majutus"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Võrgustikutöö teiste organisatsioonidega</FormLabel>
                    </FormControl>
                    <FormControl margin="normal" >
                        <InputLabel htmlFor="umarlaud">Juhtumipõhiste ümarlaudade arv (v.a. MARAC)</InputLabel>
                        <Input
                            type="number"
                            step="0.01"
                            value={this.state.formValues.umarlaud}
                            onKeyPress={this.handleNumChange}
                            onChange={this.handleChange}
                            id = "umarlaud"
                        >
                        </Input>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Suunatud MARACi</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.marac === 1}
                                    onClick={() => this.radioChange("marac", 1)}/>
                            } label="Jah"/>
                            <FormControlLabel control={
                                <Radio
                                    checked={this.state.formValues.marac === 0}
                                    onClick={() => this.radioChange("marac", 0)}/>
                            } label="Ei"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>Juhtumisse kaasatud osapooled</FormLabel>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <div>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.perearst_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("perearst_kaasatud")
                                    }}
                                />
                            } label="Perearst"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.emo_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("emo_kaasatud")
                                    }}
                                />
                            } label="EMO"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.naistearst_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("naistearst_kaasatud")
                                    }}
                                />
                            } label="Naistearst"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.ohvriabi_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("ohvriabi_kaasatud")
                                    }}
                                />
                            } label="Ohvriabi"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.politsei_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("politsei_kaasatud")
                                    }}
                                />
                            } label="Politsei"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.prokuratuur_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("prokuratuur_kaasatud")
                                    }}
                                />
                            } label="Prokuratuur"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.lastekaitse_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("lastekaitse_kaasatud")
                                    }}
                                />
                            } label="Lastekaitse"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.kov_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("kov_kaasatud")
                                    }}
                                />
                            } label="KOV sotsiaalabi"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.kriminaalkohus_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("kriminaalkohus_kaasatud")
                                    }}
                                />
                            } label="Kohus (kriminaalasjas)"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.tsiviilkohus_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("tsiviilkohus_kaasatud")
                                    }}
                                />
                            } label="Kohus (tsiviilasjas)"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.haridusasutus_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("haridusasutus_kaasatud")
                                    }}
                                />
                            } label="Haridusasutus"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.mtu_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("mtu_kaasatud")
                                    }}
                                />
                            } label="MTÜ-d"/>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.formValues.tuttavad_kaasatud === 1}
                                    onClick={() => {
                                        this.checkboxChange("tuttavad_kaasatud")
                                    }}
                                />
                            } label="Sõbrad, sugulased"/>
                        </div>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <InputLabel htmlFor="markused">Märkused</InputLabel>
                        <Input
                            value={this.state.formValues.markused}
                            onChange={this.handleChange}
                            id = "markused"
                        >
                        </Input>
                    </FormControl>
                </form>
            </Paper>

            <Paper className={classes.paper}>
                <Button
                    onClick={() => {
                        this.createSession()
                    }}
                    variant="contained"
                    color="primary"
                >
                    Salvesta
                </Button>

                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Tühista
                    </Button>
            </Paper>


        </Layout>;
    }
}

NewSession.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(NewSession));
