resource "google_dns_record_set" "a-record" {
  name         = "glad2os.io."
  type         = "A"
  ttl          = 300
  managed_zone = "glad2os-zone"
  rrdatas      = [google_compute_instance.instance-20240418-204433.network_interface.0.access_config.0.nat_ip]
}

resource "google_compute_global_address" "global_ip" {
  name = "global-ip"
}