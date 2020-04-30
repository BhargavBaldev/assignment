public class DisplayResultController {
	@AuraEnabled
    public static Double getGeoDistance(Double from_long,Double from_lat,Double to_long,Double to_lat,String unit){
        Double distance=0;
        if(unit=='Miles'){
            unit='mi';
        }
        if(unit=='Kms'){
            unit='km';
        }
        	Location loc1 = Location.newInstance(from_lat,from_long);
			
			Location loc2 = Location.newInstance(to_lat,to_long);

			distance = Location.getDistance(loc1, loc2,unit);
			System.debug(distance);
        return distance;
    }
}