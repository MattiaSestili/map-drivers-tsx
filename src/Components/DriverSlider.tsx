import { makeStyles, Slider, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 300,
    position: "relative",
    top: "37rem",
    left: "2rem"
  },
});

export const DriverSlider = (props: { UpdateSlider: (value: number) => void; VisibleDrivers: number }) => {
  const classes = useStyles();

  const valuetext = (value: number) => {
    return `${value}°C`;
  }

  const _onChangeSlider = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    props.UpdateSlider(value as number)
  }

  return (
    <div className={classes.root}>
      <Typography
        id="discrete-slider"
        gutterBottom
        style={{
          color: "#3f51b5",
          fontWeight: 500
        }}>
        Visible drivers
        </Typography>
      <Slider
        defaultValue={props.VisibleDrivers}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        marks={true}
        min={1}
        max={50}
        onChangeCommitted={_onChangeSlider}
      />
    </div>
  )
}