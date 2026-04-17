"""
Report Generator Module
Generates security analysis reports in various formats
"""

import os
from datetime import datetime

class ReportGenerator:
    def __init__(self, analysis_results):
        self.results = analysis_results
    
    def generate_text_report(self, output_folder):
        """Generate detailed text report"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        report_path = os.path.join(output_folder, f'report_{timestamp}.txt')
        
        report_content = self._build_text_content()
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
        
        return report_path
    
    def _build_text_content(self):
        """Build the text report content"""
        content = []
        
        # Header
        content.append("╔" + "═" * 78 + "╗")
        content.append("║" + " " * 20 + "APK SECURITY ANALYSIS REPORT" + " " * 30 + "║")
        content.append("╚" + "═" * 78 + "╝")
        content.append("")
        content.append(f"Application: {self.results.get('app_name', 'Unknown')}")
        content.append(f"Analysis Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        content.append("")
        
        # Executive Summary
        content.append("=" * 80)
        content.append("EXECUTIVE SUMMARY")
        content.append("=" * 80)
        content.append("")
        content.append(f"Total Vulnerabilities Found: {self.results['total_count']}")
        content.append(f"  • High Risk Issues:   {self.results['high_count']}")
        content.append(f"  • Medium Risk Issues: {self.results['medium_count']}")
        content.append(f"  • Low Risk Issues:    {self.results['low_count']}")
        content.append("")
        
        # Risk Assessment
        risk_level = self._calculate_risk_level()
        content.append(f"Overall Risk Assessment: {risk_level}")
        content.append("")
        
        # Detailed Findings
        content.append("=" * 80)
        content.append("DETAILED VULNERABILITY FINDINGS")
        content.append("=" * 80)
        content.append("")
        
        for idx, vuln in enumerate(self.results['vulnerabilities'], 1):
            content.append(f"{idx}. {vuln['title']}")
            content.append(f"   {'─' * 76}")
            content.append(f"   Risk Level: {vuln['risk']}")
            content.append("")
            content.append("   Description:")
            content.append(f"   {vuln['description']}")
            content.append("")
            
            if vuln.get('location'):
                content.append(f"   Location: {vuln['location']}")
                content.append("")
            
            content.append("   Mitigation:")
            content.append(f"   {vuln.get('mitigation', 'No specific mitigation provided')}")
            content.append("")
            content.append("")
        
        # Recommendations
        content.append("=" * 80)
        content.append("GENERAL RECOMMENDATIONS")
        content.append("=" * 80)
        content.append("")
        content.append("1. Immediate Actions (High Priority):")
        content.append("   • Address all HIGH risk vulnerabilities immediately")
        content.append("   • Implement proper encryption for sensitive data")
        content.append("   • Remove hardcoded credentials and API keys")
        content.append("   • Implement SSL certificate pinning")
        content.append("")
        content.append("2. Short-term Actions (Medium Priority):")
        content.append("   • Fix MEDIUM risk vulnerabilities within next sprint")
        content.append("   • Implement secure storage mechanisms")
        content.append("   • Disable debug mode in production builds")
        content.append("   • Review and secure WebView configurations")
        content.append("")
        content.append("3. Long-term Actions (Low Priority):")
        content.append("   • Enable code obfuscation")
        content.append("   • Implement runtime security checks")
        content.append("   • Set up regular security testing")
        content.append("   • Conduct security awareness training")
        content.append("")
        
        # Best Practices
        content.append("=" * 80)
        content.append("ANDROID SECURITY BEST PRACTICES")
        content.append("=" * 80)
        content.append("")
        content.append("Data Protection:")
        content.append("  • Use Android Keystore for cryptographic keys")
        content.append("  • Encrypt sensitive data at rest using AES-256")
        content.append("  • Use EncryptedSharedPreferences for secure storage")
        content.append("  • Implement proper key rotation mechanisms")
        content.append("")
        content.append("Network Security:")
        content.append("  • Always use HTTPS for network communications")
        content.append("  • Implement certificate pinning for critical connections")
        content.append("  • Use Network Security Configuration")
        content.append("  • Validate all SSL certificates")
        content.append("")
        content.append("Code Security:")
        content.append("  • Enable ProGuard/R8 obfuscation")
        content.append("  • Remove debug logs from production")
        content.append("  • Implement root detection")
        content.append("  • Use SafetyNet Attestation API")
        content.append("")
        
        # Disclaimer
        content.append("=" * 80)
        content.append("DISCLAIMER")
        content.append("=" * 80)
        content.append("")
        content.append("This security analysis report is generated for educational purposes only.")
        content.append("The findings should be verified manually by security professionals.")
        content.append("Always obtain proper authorization before conducting security testing.")
        content.append("")
        content.append("This tool does not guarantee detection of all vulnerabilities.")
        content.append("Regular security audits and penetration testing are recommended.")
        content.append("")
        content.append("=" * 80)
        content.append("End of Report")
        content.append("=" * 80)
        
        return "\n".join(content)
    
    def _calculate_risk_level(self):
        """Calculate overall risk level based on findings"""
        if self.results['high_count'] >= 3:
            return "CRITICAL"
        elif self.results['high_count'] >= 1:
            return "HIGH"
        elif self.results['medium_count'] >= 3:
            return "MEDIUM"
        else:
            return "LOW"
