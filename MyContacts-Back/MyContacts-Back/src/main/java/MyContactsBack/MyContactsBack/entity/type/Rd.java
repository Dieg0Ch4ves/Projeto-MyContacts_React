package MyContactsBack.MyContactsBack.entity.type;

public enum Rd {

	INSTAGRAM,
	FACEBOOK,
	LINKEDIN,
	GITHUB;
	
	public static Rd paraString(String texto) {
		switch (texto.toLowerCase()){
		case "instagram": 
			return Rd.INSTAGRAM;
		case "facebook":
			return Rd.FACEBOOK;
		case "linkedin":
			return Rd.LINKEDIN;
		case "github":
			return Rd.GITHUB;
			
		default:
			throw new IllegalArgumentException("Unexpected value: " + texto.toLowerCase());
		}
	}
}
