import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { GET_HOTELS } from './queries';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 'auto',
    height: '100%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  error: {
    color: 'rgb(139, 0, 0)',
    margin: '20px 20px',
  },
  pageTitle: {
    margin: '20px 20px',
  },
  rating: {
    display: 'flex',
    flexDirection: 'col',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 30,
    color: '#808080',
  },
  box: {
    border: 'solid',
    borderColor: '#808080',
    width: '75%',
    margin: '20px 20px',
    borderRadius: '5px',
  },
  description: {
    fontSize: 12,
  },
  refreshButton: {
    margin: '20px 20px',
  },
});

function App() {
  const classes = useStyles();

  const { loading, error, data, refetch: _refetch } = useQuery(GET_HOTELS, {
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });
  // workaround for known "apollo refetch" issue
  const refetch = (args) => _refetch(args);

  if (error) {
    console.log(error.graphQLErrors);
  }

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1 className={classes.pageTitle}>Hotels</h1>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.refreshButton}
            onClick={() => refetch()}
          >
            Refresh
          </Button>
        </div>
      </div>
      {error &&
        error.graphQLErrors.map((error, index) => (
          <span key={index} className={classes.error}>
            {error.message}
          </span>
        ))}
      {loading && (
        <>
          <Skeleton />
          <Skeleton animation={false} />
          <Skeleton animation="wave" />
        </>
      )}
      {data &&
        data?.hotel?.map((hotel, index) => (
          <div key={index}>
            <Grid container spacing={2} className={classes.box}>
              <Grid item xs={3}>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="hotel"
                    src={hotel.imageUrl}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={9} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h5">
                      {hotel.name}
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      {hotel.location}
                    </Typography>
                    <p className={classes.description}>{hotel.description}</p>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs
                  container
                  direction="column"
                  spacing={8}
                  className={classes.rating}
                >
                  <Grid item>
                    <Rating
                      name="read-only"
                      value={hotel.rating}
                      size="small"
                      readOnly
                    />
                  </Grid>
                  <Grid item className={classes.price}>
                    {hotel.pricePerNight}€
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
    </div>
  );
}

export default App;
