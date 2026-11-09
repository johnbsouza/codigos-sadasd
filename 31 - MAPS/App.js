import React, { useState, useRef, useEffect } from "react";
import { 
  StyleSheet, View, Text, TouchableOpacity, StatusBar, TextInput, 
  ActivityIndicator, Alert, Keyboard, Platform, Dimensions, Animated, 
  Easing, Image, Modal, FlatList, ScrollView 
} from "react-native";
import MapView, { Marker, Polyline, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

const DRIVER_INFO = {
  name: "Carlos Silva",
  rating: "4.9",
  vehicle: "Hyundai HB20 3D",
  plate: "ABC-1D23",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
};

const STORE_DETAILS = {
  name: "Vida no Vidro",
  address: "Rua Ferreira Viana, 715 - Vila Socorro",
  latitude: -23.661562488546007,
  longitude: -46.72067891787295,
};

// Componente de Carro 3D Moderno (Estilo Uber/99)
function Modern3DCarMarker({ rotation }) {
  return (
    <View style={styles.car3DWrapper}>
      {/* Sombra projetada no asfalto */}
      <View style={styles.car3DShadow} />

      {/* Carro 3D com volume e rotação baseada na rota */}
      <View style={[styles.car3DBody, { transform: [{ rotate: `${rotation}deg` }] }]}>
        {/* Cabine / Teto superior */}
        <View style={styles.car3DCabin} />
        {/* Capô Dianteiro */}
        <View style={styles.car3DHood} />
        {/* Ícone central em destaque */}
        <MaterialCommunityIcons name="car-sports" size={26} color="#FFFFFF" style={styles.car3DIcon} />
      </View>
    </View>
  );
}

export default function App() {
  const mapRef = useRef(null);
  const animInterval = useRef(null);
  const currentCarPos = useRef({ latitude: STORE_DETAILS.latitude, longitude: STORE_DETAILS.longitude });

  // Animações
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Configurações do Mapa
  const [mapType, setMapType] = useState('standard');
  const [showsTraffic, setShowsTraffic] = useState(false);
  const [showsMarkers, setShowsMarkers] = useState(true);
  const [mapDetailsVisible, setMapDetailsVisible] = useState(false);

  // Interface & Entrega
  const [addressInput, setAddressInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  const [isFollowingVehicle, setIsFollowingVehicle] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [avatarError, setAvatarError] = useState(false);

  const [deliveryDistance, setDeliveryDistance] = useState(null);
  const [deliveryDuration, setDeliveryDuration] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  // Chat Modal
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'driver', text: 'Olá! Já recolhi a sua encomenda na Vida no Vidro e estou a caminho.' }
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [carRotation, setCarRotation] = useState(0);

  const [carCoordinate] = useState(
    new AnimatedRegion({
      latitude: STORE_DETAILS.latitude,
      longitude: STORE_DETAILS.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  );

  useEffect(() => {
    return () => clearInterval(animInterval.current);
  }, []);

  useEffect(() => {
    if (isDelivering) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 400, easing: Easing.ease, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1.0, duration: 400, easing: Easing.ease, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
    }
  }, [isDelivering]);

  const handleMapReady = () => {
    mapRef.current?.animateCamera({
      center: { latitude: STORE_DETAILS.latitude, longitude: STORE_DETAILS.longitude },
      pitch: 60, // Inclinação ideal para ver o carro em 3D como na Uber
      heading: 0,
      zoom: 18.5,
    }, { duration: 500 });
  };

  const handleZoom = async (zoomIn) => {
    if (!mapRef.current) return;
    const camera = await mapRef.current.getCamera();
    mapRef.current.animateCamera({ zoom: (camera.zoom ?? 17) + (zoomIn ? 1 : -1), pitch: 60 }, { duration: 300 });
  };

  const recenterOnVehicle = () => {
    setIsFollowingVehicle(true);
    mapRef.current?.animateCamera({ center: currentCarPos.current, heading: carRotation, pitch: 60, zoom: 18.5 }, { duration: 600 });
  };

  const calculateHeading = (start, end) => {
    const dLon = end.longitude - start.longitude;
    const y = Math.sin(dLon) * Math.cos(end.latitude);
    const x = Math.cos(start.latitude) * Math.sin(end.latitude) - Math.sin(start.latitude) * Math.cos(end.latitude) * Math.cos(dLon);
    return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
  };

  const generatePoints = (coords) => {
    if (!coords || coords.length < 2) return coords;
    const pts = [];
    for (let i = 0; i < coords.length - 1; i++) {
      const p1 = coords[i], p2 = coords[i + 1];
      const steps = Math.max(1, Math.floor(Math.hypot(p2.latitude - p1.latitude, p2.longitude - p1.longitude) * 111000 / 8));
      for (let j = 0; j < steps; j++) {
        pts.push({ latitude: p1.latitude + (p2.latitude - p1.latitude) * (j / steps), longitude: p1.longitude + (p2.longitude - p1.longitude) * (j / steps) });
      }
    }
    pts.push(coords[coords.length - 1]);
    return pts;
  };

  const getRoute = async (origin, dest) => {
    const urls = [
      `https://routing.openstreetmap.de/routed-car/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`,
      `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${dest.longitude},${dest.latitude}?overview=full&geometries=geojson`
    ];
    for (const url of urls) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.code === 'Ok' && data.routes?.length) return data.routes[0];
      } catch (e) {}
    }
    return null;
  };

  const startTrip = (rawPoints, totalDistKm, totalDurMin) => {
    clearInterval(animInterval.current);
    const smoothPoints = generatePoints(rawPoints);
    setIsDelivering(true);
    setIsFollowingVehicle(true);
    setCurrentStep(2);
    
    let idx = 0, prevHeading = 0;
    const total = smoothPoints.length;

    animInterval.current = setInterval(() => {
      if (idx < total - 1) {
        const p1 = smoothPoints[idx], p2 = smoothPoints[idx + 1];
        currentCarPos.current = p2;

        const heading = calculateHeading(p1, p2);
        setCarRotation(heading);

        const angleDelta = Math.abs(heading - prevHeading);
        const isTurning = angleDelta > 15 && angleDelta < 345;
        setCurrentSpeed(isTurning ? Math.floor(Math.random() * 8) + 18 : Math.floor(Math.random() * 12) + 38);
        prevHeading = heading;

        const ms = isTurning ? 180 : 120;
        if (Platform.OS === 'android') {
          carCoordinate.timing({ ...p2, duration: ms, useNativeDriver: false }).start();
        } else {
          carCoordinate.animateMarkerToCoordinate(p2, ms);
        }

        if (isFollowingVehicle && idx % 2 === 0) {
          mapRef.current?.animateCamera({ center: p2, heading, pitch: 60, zoom: 18.5 }, { duration: ms * 2 });
        }

        const progress = (total - idx) / total;
        setProgressPercent(Math.min(100, Math.round((idx / total) * 100)));
        setDeliveryDistance(`${(totalDistKm * progress).toFixed(1)} km`);
        setDeliveryDuration(`${Math.ceil(totalDurMin * progress)} min`);
        idx++;
      } else {
        clearInterval(animInterval.current);
        setIsDelivering(false);
        setCurrentStep(3);
        setCurrentSpeed(0);
        setProgressPercent(100);
        setDeliveryDuration("Entregue");
        mapRef.current?.animateCamera({ pitch: 0, heading: 0, zoom: 16 }, { duration: 1000 });
        Alert.alert("Encomenda Entregue! 🚗🎉", "O motorista chegou ao seu endereço.");
      }
    }, 130);
  };

  const handleSearch = async () => {
    const q = addressInput.trim();
    if (!q) return Alert.alert('Aviso', 'Escreva o CEP ou endereço.');
    Keyboard.dismiss();
    setLoading(true);

    let query = q, cleanCep = q.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      try {
        const res = await (await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)).json();
        if (!res.erro) query = `${res.logradouro}, ${res.bairro}, ${res.localidade} - ${res.uf}`;
      } catch (e) {}
    }

    try {
      const geo = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ", São Paulo, Brasil")}`, { headers: { 'User-Agent': 'VidaNoVidro/100' } })).json();
      if (geo?.length) {
        const dest = { latitude: parseFloat(geo[0].lat), longitude: parseFloat(geo[0].lon) };
        setDestinationCoords(dest);
        const route = await getRoute({ latitude: STORE_DETAILS.latitude, longitude: STORE_DETAILS.longitude }, dest);
        if (route?.geometry?.coordinates?.length) {
          const coords = route.geometry.coordinates.map(([lon, lat]) => ({ latitude: lat, longitude: lon }));
          setRouteCoordinates(coords);
          carCoordinate.setValue({ latitude: STORE_DETAILS.latitude, longitude: STORE_DETAILS.longitude, latitudeDelta: 0, longitudeDelta: 0 });
          setLoading(false);
          startTrip(coords, route.distance / 1000, Math.round(route.duration / 60));
          return;
        }
      }
    } catch (e) {}
    setLoading(false);
    Alert.alert('Erro', 'Não foi possível encontrar a rota para este endereço.');
  };

  const sendMessage = () => {
    if (!newMessageText.trim()) return;
    setChatMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: newMessageText.trim() }]);
    setNewMessageText('');
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now().toString(), sender: 'driver', text: 'Perfeito! Em instantes chego aí.' }]);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={mapType}
        showsTraffic={showsTraffic}
        showsBuildings={true}
        showsIndoors={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        pitchEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        onMapReady={handleMapReady}
        initialRegion={{
          latitude: STORE_DETAILS.latitude,
          longitude: STORE_DETAILS.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPanDrag={() => isFollowingVehicle && setIsFollowingVehicle(false)}
      >
        {showsMarkers && (
          <>
            {/* Marcador do Carro 3D Estilo Uber / 99 */}
            <Marker.Animated 
              coordinate={carCoordinate} 
              anchor={{ x: 0.5, y: 0.5 }} 
              flat={true}
              zIndex={999}
            >
              <Animated.View style={[styles.centerAlign, { transform: [{ scale: pulseAnim }] }]}>
                <Modern3DCarMarker rotation={carRotation} />
              </Animated.View>
            </Marker.Animated>
          </>
        )}

        {routeCoordinates.length > 0 && (
          <>
            <Polyline coordinates={routeCoordinates} strokeColor="#004477" strokeWidth={10} lineCap="round" lineJoin="round" />
            <Polyline coordinates={routeCoordinates} strokeColor="#0088FF" strokeWidth={6} lineCap="round" lineJoin="round" />
          </>
        )}
      </MapView>

      {/* Barra de Pesquisa Superior */}
      <SafeAreaView style={styles.topContainer} pointerEvents="box-none">
        <View style={styles.row}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => setMapDetailsVisible(true)}>
            <MaterialCommunityIcons name="layers-outline" size={24} color="#0F172A" />
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <MaterialCommunityIcons name="magnify" size={22} color="#64748B" style={{ marginRight: 8 }} />
            <TextInput style={styles.searchInput} placeholder="Informe o CEP ou endereço..." value={addressInput} onChangeText={setAddressInput} onSubmitEditing={handleSearch} editable={!isDelivering} />
            <TouchableOpacity style={[styles.searchBtn, isDelivering && styles.disabledBtn]} onPress={handleSearch} disabled={loading || isDelivering}>
              {loading ? <ActivityIndicator color="#FFF" size="small" /> : <Text style={styles.btnText}>Buscar</Text>}
            </TouchableOpacity>
          </View>
        </View>

        {!isFollowingVehicle && isDelivering && (
          <TouchableOpacity style={styles.recenterBanner} onPress={recenterOnVehicle}>
            <MaterialCommunityIcons name="crosshairs-gps" size={18} color="#FFF" />
            <Text style={styles.bannerText}>Modo livre • Toque para centrar no carro 3D</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>

      {/* Controlo de Zoom e Velocímetro */}
      <View style={styles.controlsStack}>
        {isDelivering && (
          <View style={styles.speedBadge}>
            <MaterialCommunityIcons name="speedometer" size={16} color="#0088FF" />
            <Text style={styles.speedText}>{currentSpeed} km/h</Text>
          </View>
        )}
        {isDelivering && (
          <TouchableOpacity style={[styles.fab, isFollowingVehicle ? styles.fabActive : styles.fabInactive]} onPress={recenterOnVehicle}>
            <MaterialCommunityIcons name={isFollowingVehicle ? "navigation-variant" : "crosshairs-gps"} size={22} color={isFollowingVehicle ? "#0088FF" : "#0F172A"} />
          </TouchableOpacity>
        )}
        <View style={styles.zoomBox}>
          <TouchableOpacity style={styles.zoomBtn} onPress={() => handleZoom(true)}><MaterialCommunityIcons name="plus" size={22} color="#1E293B" /></TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.zoomBtn} onPress={() => handleZoom(false)}><MaterialCommunityIcons name="minus" size={22} color="#1E293B" /></TouchableOpacity>
        </View>
      </View>

      {/* Painel Inferior de Acompanhamento */}
      {isDelivering && (
        <View style={styles.bottomCard}>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${progressPercent}%` }]} /></View>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.statusTitle}>{currentStep === 3 ? "Encomenda Entregue! 🎉" : "Motorista a caminho..."}</Text>
              <Text style={styles.subText}>{STORE_DETAILS.name} • Terrários</Text>
            </View>
            <View style={styles.etaBadge}>
              <Text style={styles.etaValue}>{deliveryDuration}</Text>
              <Text style={styles.etaLabel}>Chegada</Text>
            </View>
          </View>

          <View style={styles.timelineRow}>
            {['Confirmado', 'A caminho', 'Entregue'].map((step, i) => (
              <React.Fragment key={step}>
                <View style={styles.centerAlign}>
                  <View style={[styles.stepDot, currentStep >= i + 1 && styles.stepActive]}>
                    <MaterialCommunityIcons name={i === 0 ? "check" : i === 1 ? "car-sports" : "home"} size={12} color="#FFF" />
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
                {i < 2 && <View style={[styles.timelineLine, currentStep >= i + 2 && styles.timelineActive]} />}
              </React.Fragment>
            ))}
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            {!avatarError ? (
              <Image source={{ uri: DRIVER_INFO.avatar }} style={styles.avatar} onError={() => setAvatarError(true)} />
            ) : (
              <View style={[styles.avatar, styles.centerAlign, { backgroundColor: '#E2E8F0' }]}><MaterialCommunityIcons name="account" size={26} color="#475569" /></View>
            )}
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.driverName}>{DRIVER_INFO.name}</Text>
                <View style={styles.ratingBadge}><MaterialCommunityIcons name="star" size={12} color="#F59E0B" /><Text style={styles.ratingText}>{DRIVER_INFO.rating}</Text></View>
              </View>
              <Text style={styles.subText}>{DRIVER_INFO.vehicle} • {DRIVER_INFO.plate}</Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.circleActionBtn} onPress={() => Alert.alert("Chamada", "A ligar ao motorista...")}><MaterialCommunityIcons name="phone" size={18} color="#0088FF" /></TouchableOpacity>
              <TouchableOpacity style={styles.circleActionBtn} onPress={() => setChatVisible(true)}><MaterialCommunityIcons name="message-text" size={18} color="#004477" /></TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Modal Camadas e Detalhes do Mapa */}
      <Modal visible={mapDetailsVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>Detalhes do mapa</Text>
              <TouchableOpacity onPress={() => setMapDetailsVisible(false)}><MaterialCommunityIcons name="close" size={24} color="#0F172A" /></TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>Detalhes do mapa</Text>
              <View style={styles.gridRow}>
                <GridOption icon="bus" label="Transporte" color="#004477" />
                <GridOption icon="routes" label="Trânsito" color="#EF4444" active={showsTraffic} onPress={() => setShowsTraffic(!showsTraffic)} />
                <GridOption icon="bike" label="Bicicleta" color="#10B981" />
              </View>

              <View style={styles.gridRow}>
                <GridOption icon="terrain" label="Relevo" color="#64748B" active={mapType === 'terrain'} onPress={() => setMapType('terrain')} />
                <GridOption icon="street-view" label="Street View" color="#F59E0B" />
                <GridOption icon="fire" label="Incêndios" color="#DC2626" />
              </View>

              <View style={styles.divider} />
              <Text style={styles.sectionTitle}>Tipo de mapa</Text>
              <View style={styles.row}>
                {['standard', 'satellite'].map((type) => (
                  <TouchableOpacity key={type} style={[styles.typeCard, mapType === type && styles.typeSelected]} onPress={() => setMapType(type)}>
                    <MaterialCommunityIcons name={type === 'standard' ? 'map' : 'earth'} size={32} color={mapType === type ? "#0088FF" : "#64748B"} />
                    <Text style={[styles.typeText, mapType === type && styles.typeTextSelected]}>{type === 'standard' ? 'Padrão' : 'Satélite'}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.checkboxRow} onPress={() => setShowsMarkers(!showsMarkers)}>
                <MaterialCommunityIcons name={showsMarkers ? "checkbox-marked" : "checkbox-blank-outline"} size={22} color="#0088FF" />
                <Text style={styles.checkboxText}>Marcadores</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal Chat em Tempo Real */}
      <Modal visible={chatVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalSheet, { height: height * 0.55 }]}>
            <View style={styles.rowBetween}>
              <Text style={styles.modalTitle}>Conversa com {DRIVER_INFO.name}</Text>
              <TouchableOpacity onPress={() => setChatVisible(false)}><MaterialCommunityIcons name="close" size={24} color="#0F172A" /></TouchableOpacity>
            </View>
            <FlatList data={chatMessages} keyExtractor={(item) => item.id} style={{ marginVertical: 12 }} renderItem={({ item }) => (
              <View style={[styles.chatBubble, item.sender === 'user' ? styles.userBubble : styles.driverBubble]}>
                <Text style={{ color: item.sender === 'user' ? '#FFF' : '#0F172A', fontSize: 13 }}>{item.text}</Text>
              </View>
            )} />
            <View style={styles.row}>
              <TextInput style={styles.chatInput} placeholder="Envie uma mensagem..." value={newMessageText} onChangeText={setNewMessageText} />
              <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}><MaterialCommunityIcons name="send" size={18} color="#FFF" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const GridOption = ({ icon, label, color, active, onPress }) => (
  <TouchableOpacity style={styles.gridItem} onPress={onPress}>
    <View style={[styles.gridIconCircle, active && { backgroundColor: color }]}>
      <MaterialCommunityIcons name={icon} size={24} color={active ? "#FFF" : color} />
    </View>
    <Text style={[styles.gridLabel, active && { color, fontWeight: '700' }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  map: { width, height, ...StyleSheet.absoluteFillObject },
  centerAlign: { justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 12 },

  /* Estilos do Carro 3D Moderno (Estilo Uber/99) */
  car3DWrapper: { width: 70, height: 70, justifyContent: 'center', alignItems: 'center' },
  car3DShadow: {
    position: 'absolute',
    bottom: 8,
    width: 42,
    height: 18,
    borderRadius: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    transform: [{ scaleY: 0.5 }, { rotate: '-15deg' }],
  },
  car3DBody: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#0088FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  car3DCabin: {
    position: 'absolute',
    top: 8,
    width: 26,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#002244',
    opacity: 0.35,
  },
  car3DHood: {
    position: 'absolute',
    bottom: 8,
    width: 18,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  car3DIcon: { zIndex: 5 },

  topContainer: { position: 'absolute', top: Platform.OS === 'android' ? 42 : 12, left: 16, right: 16, zIndex: 10 },
  iconBtn: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 6 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 16, paddingLeft: 14, paddingRight: 6, height: 54, marginLeft: 10, elevation: 6 },
  searchInput: { flex: 1, fontSize: 14, color: '#1E293B' },
  searchBtn: { backgroundColor: '#0088FF', paddingHorizontal: 16, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  disabledBtn: { backgroundColor: '#94A3B8' },
  btnText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  recenterBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', paddingVertical: 10, borderRadius: 20, marginTop: 10, gap: 8 },
  bannerText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  controlsStack: { position: 'absolute', right: 16, top: Platform.OS === 'android' ? 116 : 90, alignItems: 'center', gap: 10, zIndex: 10 },
  speedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0F172A', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  speedText: { color: '#0088FF', fontSize: 12, fontWeight: '800' },
  fab: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', elevation: 6 },
  fabActive: { backgroundColor: '#E0F7FA', borderWidth: 2, borderColor: '#0088FF' },
  fabInactive: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0' },
  zoomBox: { backgroundColor: '#FFF', borderRadius: 14, elevation: 6 },
  zoomBtn: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },

  bottomCard: { position: 'absolute', bottom: 20, left: 16, right: 16, backgroundColor: '#FFF', borderRadius: 24, padding: 20, elevation: 10, zIndex: 10 },
  progressTrack: { height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, marginBottom: 16, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#0088FF' },
  statusTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  subText: { fontSize: 12, color: '#64748B', marginTop: 2 },
  etaBadge: { backgroundColor: '#E0F7FA', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 14, alignItems: 'center' },
  etaValue: { fontSize: 17, fontWeight: '800', color: '#004477' },
  etaLabel: { fontSize: 10, color: '#64748B', fontWeight: '600', textTransform: 'uppercase' },
  
  timelineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 18 },
  stepDot: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center' },
  stepActive: { backgroundColor: '#0088FF' },
  stepText: { fontSize: 11, fontWeight: '600', color: '#64748B', marginTop: 4 },
  timelineLine: { flex: 1, height: 3, backgroundColor: '#E2E8F0', marginHorizontal: 8, marginBottom: 16 },
  timelineActive: { backgroundColor: '#0088FF' },

  avatar: { width: 46, height: 46, borderRadius: 23, borderWidth: 2, borderColor: '#F1F5F9' },
  driverName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 3 },
  ratingText: { fontSize: 11, fontWeight: '700', color: '#D97706' },
  circleActionBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', marginLeft: 8 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: height * 0.75, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A' },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: '#64748B', marginVertical: 10 },
  gridRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  gridItem: { alignItems: 'center', width: 80 },
  gridIconCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  gridLabel: { fontSize: 11, textAlign: 'center', color: '#475569' },
  typeCard: { flex: 1, borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 16, padding: 16, alignItems: 'center', backgroundColor: '#F8FAFC', marginHorizontal: 4 },
  typeSelected: { borderColor: '#0088FF', backgroundColor: '#E0F7FA' },
  typeText: { fontSize: 13, fontWeight: '600', color: '#64748B', marginTop: 8 },
  typeTextSelected: { color: '#004477', fontWeight: '700' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  checkboxText: { fontSize: 14, fontWeight: '600', color: '#0F172A' },

  chatBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginVertical: 4 },
  userBubble: { backgroundColor: '#0088FF', alignSelf: 'flex-end' },
  driverBubble: { backgroundColor: '#F8FAFC', alignSelf: 'flex-start' },
  chatInput: { flex: 1, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 14, height: 44 },
  sendBtn: { backgroundColor: '#0088FF', width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
});